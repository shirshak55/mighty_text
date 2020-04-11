# Mighty Text JSON Api

Turn your might text to json api so you can use in other part of api.

## What is mighty text?

> According to official website "Text From Any Device. Send & receive SMS and MMS from your computer or tablet, using your current Android phone number.Messages stay in sync with your phone's SMS inbox"

## Features

- Well Documented
- LTS Version of Node JS Supported
- Made with :heart

## Future Plan

- Proper Error Handling
- Using database instead of in memory
- Improve Rest API
- Authentication of API
- Admin Panel to view use of json api.
- Tests (And use of github actions)
- Global Version of cli so u can directly do `yarn global install mighty_text`
- Proper Configuration

If you want to see improvement in package development then please consider donation.

# Requirements

- Yarn or NPM (Use yarn v1 atm)
- Node JS v10+
- Chrome Browser

# How to use?

1. Clone the repo

```bash
// Clone this repo
$ git clone https://github.com/shirshak55/mighty_text_json_api
$ cd mighty_text_json_api
```

2. Run `yarn` or `yarn install` or `npm install`

3. Copy config.toml.example to config.toml and edit the variable especially gmail login and password

```bash
cp config.toml.example config.toml
```

4. If you want to build the app instead of relying on distributed dist then run 'yarn build'

5. Run yarn start

6. If you want to run it as daemon then stop the server using SIGINT (`ctrl + c`) and run following command.

```bash
$ yarn global install pm2
$ yarn
```

## License

I am opeen to opensource so I am publishing this with MIT License. For more info check [LICENSE](LICENSE.md).

## Contribution

Any ideas are welcome. Feel free to submit any issues or pull requests, please check the [contribution guidelines](CONTRIBUTING.md).

## Security

If you discover any security related issues, please email shirshak55@pm.me instead of using the issue tracker.

## Credits

- [shirshak55][link-author]
- [All Contributors][link-contributors]

[link-author]: https://github.com/shirshak55
[link-contributors]: https://github.com/shirshak55/mighty_text_json_api/graphs/contributors
