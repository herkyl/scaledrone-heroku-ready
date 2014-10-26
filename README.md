[Heroku dev center staging guide to ScaleDrone](https://devcenter.heroku.com/articles/scaledrone?preview=1)

## Provisioning the add-on

ScaleDrone can be attached to a Heroku application via the  CLI:

```term
$ heroku addons:add scaledrone
-----> Adding ScaleDrone to sharp-mountain-4005... done, v18 (free)
```

Once ScaleDrone has been added `SCALEDRONE_CHANNEL_ID` and `SCALEDRONE_CHANNEL_SECRET` settings will be available in the app configuration and will contain the channel's ID and channel's secret. This can be confirmed using the `heroku config:get` command.

```term
$ heroku config:get SCALEDRONE_CHANNEL_ID
YOUR_PUBLIC_CHANNEL_ID

$ heroku config:get SCALEDRONE_CHANNEL_SECRET
YOUR_PRIVATE_CHANNEL_SECRET
```

After installing ScaleDrone the application should be configured to fully integrate with the add-on.

## Local setup

### Environment setup

After provisioning the add-on it's necessary to locally replicate the config vars so your development environment can operate against the service.

Use Foreman to configure, run and manage process types specified in your app's Procfile. Foreman reads configuration variables from an .env file. Use the following command to add the values retrieved from heroku config to `.env`.

```term
$ heroku config -s >> .env
$ more .env
```
