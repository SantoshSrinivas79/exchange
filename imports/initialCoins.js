const base = [
    { ProductSymbol: 'ADA', ProductFullName: 'Cardano', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'AE', ProductFullName: 'Aeternity', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'AGI', ProductFullName: 'SingularityNET', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'AION', ProductFullName: 'Aion', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'AMB', ProductFullName: 'Ambrosus', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'ARN', ProductFullName: 'Aeron', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'AST', ProductFullName: 'AirSwap', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'BAT', ProductFullName: 'Basic Attention Token', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'BCD', ProductFullName: 'Bitcoin Diamond', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'BCHABC', ProductFullName: 'Bitcoin cash', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'BCPT', ProductFullName: 'BlockMason Credit Protocol', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'BNB', ProductFullName: 'Binance', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'BTC', ProductFullName: 'Bitcoin', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'BTT', ProductFullName: 'Blocktrade Token', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'CELR', ProductFullName: 'Celer Network', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'CMT', ProductFullName: 'Comet', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'DASH', ProductFullName: 'Dash', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'DGD', ProductFullName: 'DigixDAO', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'DLT', ProductFullName: 'Agrello', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'DNT', ProductFullName: 'district0x', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'DOCK', ProductFullName: 'Dock', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'ELF', ProductFullName: 'aelf', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'ENJ', ProductFullName: 'Enjin Coin', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'EOS', ProductFullName: 'EOS', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'ESCB', ProductFullName: 'EscrowBlock', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'ETC', ProductFullName: 'Ethereum Classic', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'ETH', ProductFullName: 'Ethereum', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'EVX', ProductFullName: 'Everex', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'FET', ProductFullName: 'Fetch', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'FUEL', ProductFullName: 'Etherparty', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'GO', ProductFullName: 'GoChain', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'GTO', ProductFullName: 'Gifto', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'GXS', ProductFullName: 'GXChain', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'HC', ProductFullName: 'HyperCash', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'ICX', ProductFullName: 'Icon', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'INS', ProductFullName: 'Insolar', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'IOST', ProductFullName: 'IOST', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'IOTA', ProductFullName: 'IOTA', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'IOTX', ProductFullName: 'IoTeX', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'KMD', ProductFullName: 'Komodo', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'LINK', ProductFullName: 'Chainlink', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'LOOM', ProductFullName: 'Loom network', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'LSK', ProductFullName: 'Lisk', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'LTC', ProductFullName: 'Litecoin', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'MANA', ProductFullName: 'Decentraland', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'MCO', ProductFullName: 'Crypto.com', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'MDA', ProductFullName: 'Moeda Loyalty Points', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'MFT', ProductFullName: 'Mainframe', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'MITH', ProductFullName: 'Mithril', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'MTL', ProductFullName: 'Metal', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'NANO', ProductFullName: 'NANO', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'NAS', ProductFullName: 'Nebulas', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'NCASH', ProductFullName: 'Nucleus Vision', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'NEO', ProductFullName: 'NEO', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'NPXS', ProductFullName: 'Pundi X', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'NULS', ProductFullName: 'NULS', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'OAX', ProductFullName: 'OAX', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'OMG', ProductFullName: 'OmiseGo', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'ONG', ProductFullName: 'Ontology Gas', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'ONT', ProductFullName: 'Ontology', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'OST', ProductFullName: 'OST', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'PAX', ProductFullName: 'Paxos Standard Token', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'PHX', ProductFullName: 'Red Pulse Phoenix', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'PIVX', ProductFullName: 'PIVX', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'POLY', ProductFullName: 'Polymath', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'QKC', ProductFullName: 'QuarkChain', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'QLC', ProductFullName: 'QLC Chain', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'QTUM', ProductFullName: 'Qtum', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'RDN', ProductFullName: 'Raiden Network Token', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'REN', ProductFullName: 'Ren', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'REP', ProductFullName: 'Augur', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'RVN', ProductFullName: 'Ravecoin', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'SC', ProductFullName: 'Siacoin', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'SKY', ProductFullName: 'Skycoin', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'STRAT', ProductFullName: 'Stratis', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'SYS', ProductFullName: 'Syscoin', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'THETA', ProductFullName: 'THETA', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'TNB', ProductFullName: 'Time new bank', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'TPAY', ProductFullName: 'TokenPay', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'TRX', ProductFullName: 'Tron', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'TUSD', ProductFullName: 'TrueUSD', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'USDC', ProductFullName: 'USDCoin', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'USDS', ProductFullName: 'StableUSD', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'VET', ProductFullName: 'VeChain', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'VIA', ProductFullName: 'Viacoin', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'VIB', ProductFullName: 'Viberate', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'WABI', ProductFullName: 'Tail', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'WAN', ProductFullName: 'Wanchain', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'WAVES', ProductFullName: 'Waves', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'WTC', ProductFullName: 'Waltonchain', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'XEM', ProductFullName: 'NEM', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'XLM', ProductFullName: 'Stellar', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'XMR', ProductFullName: 'Monero', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'XRP', ProductFullName: 'XRP', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'XVG', ProductFullName: 'Verge', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'XZC', ProductFullName: 'ZCoin', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'ZEC', ProductFullName: 'ZCash', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'ZIL', ProductFullName: 'Zilliqa', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'ZRX', ProductFullName: '0x', ProductType: 'CryptoCurrency' },
];

const quote = [
    { ProductSymbol: 'ESCB', ProductFullName: 'EscrowBlock', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'BNB', ProductFullName: 'Binance', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'BTC', ProductFullName: 'Bitcoin', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'ETH', ProductFullName: 'Ethereum', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'PAX', ProductFullName: 'Paxos Standard Token', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'TUSD', ProductFullName: 'TrueUSD', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'USDC', ProductFullName: 'USDCoin', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'USDS', ProductFullName: 'StableUSD', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'XRP', ProductFullName: 'XRP', ProductType: 'CryptoCurrency' },
    { ProductSymbol: 'USD', ProductFullName: 'US dollar', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'JPY', ProductFullName: 'Japanese yen', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'BGN', ProductFullName: 'Bulgarian lev', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'CZK', ProductFullName: 'Czech koruna', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'DKK', ProductFullName: 'Danish krone', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'GBP', ProductFullName: 'Pound sterling', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'HUF', ProductFullName: 'Hungarian forint', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'PLN', ProductFullName: 'Polish zloty', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'RON', ProductFullName: 'Romanian leu', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'SEK', ProductFullName: 'Swedish krona', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'CHF', ProductFullName: 'Swiss franc', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'ISK', ProductFullName: 'Icelandic krona', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'NOK', ProductFullName: 'Norwegian krone', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'HRK', ProductFullName: 'Croatian kuna', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'RUB', ProductFullName: 'Russian rouble', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'TRY', ProductFullName: 'Turkish lira', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'AUD', ProductFullName: 'Australian dollar', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'BRL', ProductFullName: 'Brazilian real', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'CAD', ProductFullName: 'Canadian dollar', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'CNY', ProductFullName: 'Chinese yuan renminbi', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'HKD', ProductFullName: 'Hong Kong dollar', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'IDR', ProductFullName: 'Indonesian rupiah', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'ILS', ProductFullName: 'Israeli shekel', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'INR', ProductFullName: 'Indian rupee', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'KRW', ProductFullName: 'South Korean won', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'MXN', ProductFullName: 'Mexican peso', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'MYR', ProductFullName: 'Malaysian ringgit', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'NZD', ProductFullName: 'New Zealand dollar', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'PHP', ProductFullName: 'Philippine peso', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'SGD', ProductFullName: 'Singapore dollar', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'THB', ProductFullName: 'Thai baht', ProductType: 'NationalCurrency' },
    { ProductSymbol: 'ZAR', ProductFullName: 'South African rand', ProductType: 'NationalCurrency' },
];

export { base, quote };
