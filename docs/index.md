---
layout: default
title: Status
nav_order: 1
---
![Fismo](images/fismo-logo.png)
# The Finite State Machine Protocol for EVM Blockchains
## 🖥 [GitHub Repository](https://github.com/cliffhall/Fismo/)

Fismo Machines are a way of simulating stateful things, processes, or maps of places.

**Consider this:** There are standards for tokens that allow us to represent things like currency, ownership, and membership. _Why do we have no standard for representing a process or map and an individual's journey through it?_

Fismo enforces rules about transitions between states when users invoke actions. The implementer writes custom Solidity functions that get called when transitions happen. Transitions don't always need such hooks, but when they do, anything can be queried or stored.

Each user's progress through a Fismo Machine is recorded and can be queried publicly by anyone. State transitions can be gated by the tokens a user holds, places the've been, or any other  accessible stored value. Likewise, new values could be stored or tokens transferred to a user when they take some action or arrive at some waypoint.

### But wait, there's more...
* 💥 Cheaply clone Fismo on Ethereum or deploy to any EVM
* 💥 Configure and install a virtually unlimited number of machines
* 💥 Deploy custom logic for controlling access to your machines
* 💥 Deploy custom logic for any state transition
* 💥 Deploy custom logic to contextually filter available actions
* 💥 Use off-chain metadata to richly describe states in any medium

##  [![Created by Futurescale](images/created-by.png)](https://futurescale.com)