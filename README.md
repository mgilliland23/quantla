# quantla
Quantla is a quantitative laboratory for automation group. Its focuses on using AI techniques to automate online trade advisor platforms and decisions. Initial application uses Bitcoin market allowing users to access current market data (news/ prices/ fundamentals) and its powered by an AI that is recurrently trained with the data to identify pattern and trading opportunities.

https://www.quantla.com


# Technology Used
![Javascript](https://img.shields.io/badge/Javascript-code-blue.svg)
![Html](https://img.shields.io/badge/HTML-language-blue.svg)
![CSS](https://img.shields.io/badge/CSS-language-blue.svg)
![Node](https://img.shields.io/badge/Node.js-server-red.svg)
![handlebars](https://img.shields.io/badge/Handlebars-templating-red.svg)
![NPM](https://img.shields.io/badge/npm-package%20manager-red.svg)
![Heroku](https://img.shields.io/badge/Heroku-host-green.svg)
![AWS](https://img.shields.io/badge/AWS-host-green.svg)
![MySQL](https://img.shields.io/badge/mySQL-database-yellow.svg)


# app Description
AI bot advisor for the Bitcoin Market

## News extraction
Bitcoin market is quite unique as everyone has always something to say about it. Conventional media and news analysis is not suitable for this market. In order to tackle this issue we extract information from twitter feed and we monitor specific #hashtags like #bitcoin or #BTC.

## Price Data
We decided to focus on a single price source @Poloniex. Reason for this is that @Poloniex offers a very robust API to extract live prices as well as has a proof auditing process that monitors exchange activity 24/7/365.

## Blockchain fundamentals
Its clear that bitcoin prices are correlated to the blockchain fundamentals like hash-rate, number of transactions per day, cost per trade. We monitor this information on a 24h time frame from blockchain.info to spot any trends.

## Artificial Intelligence
All that information is quite a lot to process, every 5min we produce 143 data points. Its no job for a human to keep processing all this data - good thing that we have AI. We implemented a Neural Network Classifier to spot 10min trends as well as its support and resistance levels.


# Keywords
Bitcoin, Artificial Intelligence, Tensorflow, data science, Neural Networks, Columbia University, Applied Mathematics, Financial Industry, automated trade advisor.

# Our team

    Matt Gilliland - CEO/CTO.

    Rodrigo Costa - Data Science Director.
