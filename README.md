[![Semaphore CI](https://bigbinary.semaphoreci.com/badges/PMS.svg)](https://bigbinary.semaphoreci.com/projects/pms)

Made by the team at [BigBinary](https://bigbinary.com).

## Local Development Setup

Install the latest [Node.js](https://nodejs.org) version.
Make sure that [npm](https://www.npmjs.com/) is installed with it as well.

```
./bin/setup
```

Start the server by executing following command.

```
bundle exec rails server
```

Visit http://localhost:3000 and login with email `oliver@example.com` and password `welcome`.

## Features

- Uses [Tailwind CSS](https://tailwindcss.com).
- `rake setup` to set sensible sample data including user `oliver@example.com` with password `welcome`.
- Uses [devise](https://github.com/plataformatec/devise).
- Heroku ready. Push to Heroku and it will work.
- Uses [Honeybadger](https://www.honeybadger.io/).
- Uses slim for cleaner syntax over erb and better performance over haml.
- Uses [ActiveAdmin](http://activeadmin.info).
- Uses [Sidekiq](https://github.com/mperham/sidekiq).
- Intercepts all outgoing emails in non production environment using gem [mail_interceptor](https://github.com/bigbinary/mail_interceptor).
- Uses [SemaphoreCI](https://semaphoreci.com/) for continuous testing.
- Uses PostgreSQL.
- Content compression via [Rack::Deflater](https://github.com/rack/rack/blob/master/lib/rack/deflater.rb).
- Auto-formats Ruby code with [rubocop](https://github.com/bbatsov/rubocop).
- Auto-formats JavaScript and CSS code with [prettier](https://github.com/prettier/prettier).
- Performs background job processing "inline" for heroku env. It means heroku can deliver emails.
- Letter opener gem for development.

## Checklist

- [ ] Create a new repo called `pms-web`.
- [ ] Push PMS code to the new repo.
- [ ] In Heroku build and deploy application named `pms-web-staging`.
- [ ] Create a new virtual credit card for this project using [Brex](https://www.brex.com/).This step is specific to BigBinary.
- [ ] Signup for a free [honeybadger.io account](https://honeybader.io).
- [ ] Update `config/honeybadger.yml` with the honeybadger key
- [ ] Setup Heroku Review and a team.
- [ ] Signup for Semaphore CI.
- [ ] Update semaphore CI badge in README.
- [ ] Configure Honeybadger to automatically create issues in Github.

## Push PMS code to the new repo

```
git clone git@github.com:bigbinary/PMS.git
mv PMS pms-web
cd pms-web
```

Open `.git/config` file.

```
code .git/config
```

Change `bigbinary/PMS.git` to `bigbinary/pms-web.git` and save the file.

```
git push origin master
```

## Deploying application to Heroku

- [ ] Login to heroku and click on "New" at the top right corner.
- [ ] Name of the application should be "#{reponame}-staging". In this case it would be `pms-web-staging`.
- [ ] Click on "Deploy" tab and then click on "Github" tab.
- [ ] You will see a dropdown with the label "Searh for a repository to connect to". Select BigBinary in the dropdown.
- [ ] Put "pms-web-staging" in the app. Connect the app.
- [ ] Scroll to the bottom of the page and click on button "Deploy Branch".
- [ ] Wait and do not do anything until deployment is complete.
- [ ] Click on tab "Settings".
- [ ] Click on link "Reveal Config Vars".
- [ ] Change `RAILS_ENV` and `RACK_ENV` to `staging`.
- [ ] Install [heroku cli](https://devcenter.heroku.com/articles/heroku-cli).
- [ ] Execute command `heroku run rake populate_sample_data -a pms-web-staging` to populate sample data in the staging application.
- [ ] Now you should be able to login to the deployed application.
- [ ] Click on tab "Resources".
- [ ] Click on "Change Dyno Type".
- [ ] Select "Hobby" plan.
- [ ] If you need to enable sidekiq worker then enable that also.

## Creating Heroku pipeline

- Click on Personal at the top left corner.
- Click on "New pipeline" a the top right corner
- Pipeline name should be "#{reponame}-pipeline". In this case it would be `pms-web-pipeline`.
- In the "Staging" column click on "Add app" and select `pms-web-staging`.
- Click on "Enable Review Apps" button.
- Check "Create new review apps for new pull requests automaticallY'
- Check "Destroy stale review apps automatically". In the dropdown select "After 5 Days".
- We are not using Heroku CI so leave CI unchecked.
- Click on "Enable review apps" button.
- Click on "Configure" link.
- Click on "More settings".
- Click on button "Update URL pattern".
- Ensure that "Predictable" radio button is selected.
- In the Unique Identifier put ther reponame which in this case would be "pms-web".
- Click on "Update URL pattern"

## Creating Heroku team

- Click On "Personal".
- In the pull down there you will have an option to create a new team. Click on that.
- Team name should "reponame-team". In this case it would be "lexcel-web-team".
- Click on "Add credit card".
- Now click on "Transfer existing app". Select "lexcel-web-staging".
- Invite other team members to the team. Make everyone "Admin"
- Click on Person. Go to the pipeline. Go to settings. Scroll to the to bottom. Select "pms-web-team" in the "Choose a pipeline owner".

## Heroku Review

[Heroku Review](https://devcenter.heroku.com/articles/github-integration-review-apps)
is enabled on this application. It means when a PR is sent then Heroku
automatically deploys an application for that branch.

## About BigBinary

![BigBinary](https://raw.githubusercontent.com/bigbinary/bigbinary-assets/press-assets/PNG/logo-light-solid-small.png?raw=true)

PMS is maintained by [BigBinary](https://www.BigBinary.com). BigBinary is a software consultancy company. We build web and mobile applications using Ruby on Rails, React.js, React Native and Node.js.
