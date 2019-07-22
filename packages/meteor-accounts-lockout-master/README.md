## Accounts-lockout package


### What it is

Seamless Meteor apps accounts protection from password brute-force attacks. 
Users won't notice it. Hackers shall not pass.


![you-shall-not-pass](https://cloud.githubusercontent.com/assets/3399956/9023729/007dd2a2-38b1-11e5-807a-b81c6ce00c80.jpg)



### Use

Locks user accounts for `duration` seconds after them having entered wrong passwords `attempts` times in a row.
`duration` = 15 and `attempts` = 5 by default and can be overriden in settings file:

``` json
"accounts-lockout" : {
  "duration": 5,
  "attempts": 10
}
```

The package is designed to live in multiple servers environment and survive servers restarts.



### Install

``` bash
meteor add eluck:accounts-lockout
```


### Youtube video with a usage example

http://youtu.be/X-_Yd-rh1KY?hd=1



### Github repository

[https://github.com/eluck/meteor-accounts-lockout](https://github.com/eluck/meteor-accounts-lockout)
