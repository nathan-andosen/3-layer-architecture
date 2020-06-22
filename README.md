# 3-layer-architecture

A layered architecture for building web applications.

### Goal

Build a web application that has a clear architecture that will make it easy to maintain, develop and test by all team members.

This will be accomplished via the following necessities:

* Separation of concern via [horizontal](#horizontal-separation) and vertical separation (more detail below),
* Improved store / state management that is immutable, reactive and the flow of data is unidirectional,
* Tested,
* Modular

### Why?

* Every successful project needs a clear architecture, which is understood by all team members.
* Bigger applications usually means a bigger team consisting of people with varying degree of front-end knowledge, having a clear set of guidelines regarding the architecture and coding style pays off very fast.
* __Common questions:__
  * Where do I put this piece of code?
  * How do I modify data?
  * What changed my data?
* Separation of concern

# Glossary

#### Aggregate

> Collection of objects that are bound together by a root entity. I like to use composition to accomplish this.

#### Business Logic

> Business rules that determine how data can be created, stored and updated

#### DDD

> [Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design)

#### Domain

> A sphere of knowledge or activity

#### Horizontal separation

> Separate your code into layers

---

`Aggregate` - Collection of objects that are bound together by a root entity. I like to use composition to accomplish this.

`Business Logic` - Business rules that determine how data can be created, stored and updated

`DDD` - [Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design)

`Domain` - A sphere of knowledge or activity

`Entity` - The actual instance of the object

`Factory` - Create a domain object / model

`Horizontal separation` - Separate your code into layers

`Model (Value object)` - Template of an entity. Methods that set / get data. Also includes business logic that relates to the object only. DDD refers to a model as a value object. _Some design patterns state that models should have no business logic, however, DDD (Domain Driven Design) finds this an anti-pattern, and states the model should have business logic if it relates to that object. [Anemic_domain_model](https://en.wikipedia.org/wiki/Anemic_domain_model)_

`Repository` - The storage where objects are stored

`Service` - When an operation does not conceptually belong to a single object, you will use services to perform that operation / logic. Methods to perform operations with one or more models.

`State` - The state object or array of objects. The actual data of the entity

`Store` - Ability to add, update, remove from state. Reactive, notify subscribers

`Vertical separation` - Separate the app into features
