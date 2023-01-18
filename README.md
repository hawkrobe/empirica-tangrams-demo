# Tangram reference game

This reference game experiment is powered by
[Empirica](https://empirica.ly/) (here is a basic
[tutorial](https://www.youtube.com/watch?v=K2YhEZey_58&list=PLPQelvUwyVgiawBDk3Sp74QMfL8RPgORW&index=1)).

## Testing

To develop locally, 

1. make sure you [have meteor installed](https://www.meteor.com/install), 
2. clone the repo, navigate to `/refgame/`, and run `meteor npm install` to get the dependencies
3. launch locally with `meteor` 
4. go to `http://localhost:3000/admin` in your browser and enter the password that was randomly generated in the previous step
5. click the 'import' button and select `config.yaml` 
6. click 'new batch' to start a game, select the `demo` treatment, and go to `localhost:3000` in a new tab to join the experiment as a user 

## Deployment

When ready to collect data, we can deploy publicly on Meteor Galaxy:

```
DEPLOY_HOSTNAME=galaxy.meteor.com meteor deploy codeswitching.meteorapp.com --settings settings.json
```
