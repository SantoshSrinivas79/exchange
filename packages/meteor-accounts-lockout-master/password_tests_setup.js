Accounts.validateNewUser(function (user) {
    if (user.profile && user.profile.invalidAndThrowException) throw new Meteor.Error(403, 'An exception thrown within Accounts.validateNewUser');
    return !(user.profile && user.profile.invalid);
});

Accounts.onCreateUser(function (options, user) {
    if (options.testOnCreateUserHook) {
        user.profile = user.profile || {};
        user.profile.touchedByOnCreateUser = true;
        return user;
    }
    return 'TEST DEFAULT HOOK';
});


// connection id -> action
const invalidateLogins = {};


Meteor.methods({
    testInvalidateLogins (action) {
        if (action) invalidateLogins[this.connection.id] = action;
        else delete invalidateLogins[this.connection.id];
    },
});


Accounts.validateLoginAttempt(function (attempt) {
    const action = attempt
    && attempt.connection
    && invalidateLogins[attempt.connection.id];

    if (!action) return true;
    if (action === 'fail') return false;
    if (action === 'hide') throw new Meteor.Error(403, 'hide actual error');
    else throw new Error(`unknown action: ${action}`);
});


// connection id -> [{successful: boolean, attempt: object}]
const capturedLogins = {};

Meteor.methods({
    testCaptureLogins () {
        capturedLogins[this.connection.id] = [];
    },

    testFetchCapturedLogins () {
        if (capturedLogins[this.connection.id]) {
            const logins = capturedLogins[this.connection.id];
            delete capturedLogins[this.connection.id];
            return logins;
        }
        return [];
    },
});

Accounts.onLogin(function (attempt) {
    if (capturedLogins[attempt.connection.id]) {
        capturedLogins[attempt.connection.id].push({
            successful: true,
            attempt: _.omit(attempt, 'connection'),
        });
    }
});

Accounts.onLoginFailure(function (attempt) {
    if (capturedLogins[attempt.connection.id]) {
        capturedLogins[attempt.connection.id].push({
            successful: false,
            attempt: _.omit(attempt, 'connection'),
        });
    }
});

// Because this is global state that affects every client, we can't turn
// it on and off during the tests. Doing so would mean two simultaneous
// test runs could collide with each other.
//
// We should probably have some sort of server-isolation between
// multiple test runs. Perhaps a separate server instance per run. This
// problem isn't unique to this test, there are other places in the code
// where we do various hacky things to work around the lack of
// server-side isolation.
//
// For now, we just test the one configuration state. You can comment
// out each configuration option and see that the tests fail.
Accounts.config({
    sendVerificationEmail: true,
});


Meteor.methods({
    testMeteorUser () { return Meteor.user(); },
    clearUsernameAndProfile () {
        if (!this.userId) throw new Error('Not logged in!');
        Meteor.users.update(this.userId,
            { $unset: { profile: 1, username: 1 } });
    },

    expireTokens () {
        Accounts._expireTokens(new Date(), this.userId);
    },
    removeUser (username) {
        Meteor.users.remove({ username });
    },
});


// Create a user that had previously logged in with SRP.

Meteor.methods({
    testCreateSRPUser () {
        const username = Random.id();
        Meteor.users.remove({ username });
        const userId = Accounts.createUser({ username });
        Meteor.users.update(
            userId,
            {
                $set: {
                    'services.password.srp': {
                        identity: 'iPNrshUEcpOSO5fRDu7o4RRDc9OJBCGGljYpcXCuyg9',
                        salt: 'Dk3lFggdEtcHU3aKm6Odx7sdcaIrMskQxBbqtBtFzt6',
                        verifier: '2e8bce266b1357edf6952cc56d979db19f699ced97edfb2854b95972f820b0c7006c1a18e98aad40edf3fe111b87c52ef7dd06b320ce452d01376df2d560fdc4d8e74f7a97bca1f67b3cfaef34dee34dd6c76571c247d762624dc166dab5499da06bc9358528efa75bf74e2e7f5a80d09e60acf8856069ae5cfb080f2239ee76',
                    },
                },
            },
        );
        return username;
    },

    testSRPUpgrade (username) {
        const user = Meteor.users.findOne({ username });
        if (user.services && user.services.password && user.services.password.srp) throw new Error("srp wasn't removed");
        if (!(user.services && user.services.password && user.services.password.bcrypt)) throw new Error("bcrypt wasn't added");
    },

    testNoSRPUpgrade (username) {
        const user = Meteor.users.findOne({ username });
        if (user.services && user.services.password && user.services.password.bcrypt) throw new Error('bcrypt was added');
        if (user.services && user.services.password && !user.services.password.srp) throw new Error('srp was removed');
    },
});
