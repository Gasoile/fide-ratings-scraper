# FIDE ratings scraper

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/fide-ratings-scraper.svg?style=flat-square)](https://www.npmjs.com/package/fide-ratings-scraper)
[![Build Status](https://circleci.com/gh/xRuiAlves/fide-ratings-scraper.svg?style=shield)](https://circleci.com/gh/xRuiAlves/fide-ratings-scraper)
[![Coverage Status](https://coveralls.io/repos/github/xRuiAlves/fide-ratings-scraper/badge.svg?branch=master)](https://coveralls.io/github/xRuiAlves/fide-ratings-scraper?branch=master)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2FxRuiAlves%2Ffide-ratings-scraper%2Fmaster)](https://dashboard.stryker-mutator.io/reports/github.com/xRuiAlves/fide-ratings-scraper/master)

[FIDE](http://ratings.fide.com/) is the International Chess Federation. They have a ratings sub-domain where players can check their international ELO rating (in different categories), their perfomance history, *et cetera*.

This package offers an interface (both as a CLI and/or as a server API) to get chess player ratings information in a programative way.

## API

### <span style="color:green">GET&nbsp;</span> Player Full Info

```
/player/{fide_number}/info
```

Get all the information provided by FIDE about the player. 

```json
{
    "name": "Doe, John",
    "federation": "Portugal",
    "birth_year": 1980,
    "sex": "Male",
    "title": "None",
    "standard_elo": 1700,
    "rapid_elo": 1650,
    "blitz_elo": 1750,
    "world_rank_all_players": 180000,
    "world_rank_active_players": 135200,
    "national_rank_all_players": 760,
    "national_rank_active_players": 325,
    "continental_rank_all_players": 132400,
    "continental_rank_active_players": 62405
}
```

### <span style="color:green">GET&nbsp;</span> Player Personal Data

```
/player/{fide_number}/personal-data
```

Get the player's personal data.

```json
{
    "name": "Doe, John",
    "federation": "Portugal",
    "birth_year": 1980,
    "sex": "Male",
    "title": "None",
}
```

### <span style="color:green">GET&nbsp;</span> Player Rank

```
/player/{fide_number}/rank
```

Get the player's rank in different ranking lists.

```json
{
    "world_rank_all_players": 180000,
    "world_rank_active_players": 135200,
    "national_rank_all_players": 760,
    "national_rank_active_players": 325,
    "continental_rank_all_players": 132400,
    "continental_rank_active_players": 62405
}
```

### <span style="color:green">GET&nbsp;</span> Player ELO

```
/player/{fide_number}/elo
```

Get the player's ELO in all the categories.

```json
{
    "standard_elo": 1700,
    "rapid_elo": 1650,
    "blitz_elo": 1750,
}
```

### <span style="color:green">GET&nbsp;</span> Player History

```
/player/{fide_number}/history
```

Get a full list of all the player's ELO ratings (in all the categories) along the past years, ordered by date (most recent first).

```json
[
    {
        "date": "2019-Oct",
        "numeric_date": 201910,
        "standard": "1700",
        "num_standard_games": "1",
        "rapid": "1650",
        "num_rapid_games": "0",
        "blitz": "1750",
        "num_blitz_games": "0"
    },
    {
        "date": "2019-Sep",
        "numeric_date": 201909,
        "standard": "1692",
        "num_standard_games": "1",
        "rapid": "1610",
        "num_rapid_games": "9",
        "blitz": "1750",
        "num_blitz_games": "0"
    },
    {
        "date": "2019-Aug",
        "numeric_date": 201908,
        "standard": "1680",
        "num_standard_games": "2",
        "rapid": "1610",
        "num_rapid_games": "0",
        "blitz": "1720",
        "num_blitz_games": "2"
    }
]
```

## Running API

You may find a running sample at [https://fide-ratings-scraper.herokuapp.com/](https://fide-ratings-scraper.herokuapp.com/), deployed using [Heroku](https://www.heroku.com).
