# 3 Layer Architecture

A layered architecture for building web applications.

### Goal

Build a web application that has a clear architecture that will make it easier to maintain, develop and test by all team members.

This will be accomplished via the following necessities:

* [Separation of concern](#separation-of-concern) via [horizontal](#horizontal-separation) and [vertical](#vertical-separation) separation,
* Improved [store](#store) / [state](#state) management that is immutable, reactive and the flow of data is unidirectional,
* Tested,
* [Modular](#modular-/-module)
* [Domain driven design](#domain-driven-design)

### Why?

* Every successful project needs a clear architecture, which is understood by all team members.
* Bigger applications usually means a bigger team consisting of people with varying degree of front-end knowledge, having a clear set of guidelines regarding the architecture and coding style pays off very fast.
* __Common questions:__
  * Where do I put this piece of code?
  * How do I modify data?
  * What changed my data?

### Benefits

* __Decoupling from the view framework__ - A lot of the code is written outside of the view framework / library (Angular, React, VueJs), making it easier to upgrade or switch to a different view framework. You can see in this example repo, we have three different views (view-angular, view-react, view-vuejs) that all use the same _domain_ and _app-services_ layers. As well, there are many more benefits to [Separation of concern](#separation-of-concern) as you will read below.
* __Minimal dependencies used__ - We basically only have 2 dependencies: __rxjs__ to handle our ajax requests & reactive state management and our __view framework__. These two dependencies give us a lot of functionality. Keeping dependencies low makes it easier to maintain and upgrade applications. Obviously, as your application grows, you will add more dependencies.

# Separation of concern

In essence, separation of concern is about organising an application into sets of responsibilities. This is achieved by boundaries. A boundry is a logical constraint which describes a given set of responsibilities. Example of boundaries would include layers, application features, reusable libraries. For a more detailed explanation, [read this blog](http://aspiringcraftsman.com/2008/01/03/art-of-separation-of-concerns/).

The value of separation of concern:

* __Complexity becomes manageable__
* __Reduce duplication__
* __Maintainability__ - single purpose of individual components render the overall system easier to maintain
* __Stability__ - because each individual component is easier to maintain, the overall application becomes more stable
* __Reusability__ - because each individual component normally concerns itself with a single set of responsibilities, they become more reusable.
* __Increased development time__ - team members can work on individual separate components.
* __Improved bug fixing__ - if responsibilities are properly allocated to the right component, it becomes easier to identify where issues are occurring and where new features should be added.

## Horizontal separation

Horizontal separation is achieved via layers. We will use 3 layers to separate our application.

#### App / View layer

* The UI of the application
* Will no doubt use a framework like: Angular, React, Vue.
* Uses reactive state _(from domain/store layer)_ to display data

#### Application Sevices layer

* Services needed by the application, some examples:
  * Api service for ajax request
  * Services to manipulate state data for the view, such as, make a users name all uppercase
  * Authentication / Authorization services
* Utility functions

#### Domain & Store layer

* Business logic via services & models
* Represents the state (structure of the data)
* Consists of entities & models
* Holds the state in a store that is immutable and reactive

### Guidelines / Rules about layers

* The domain & application services layer know nothing about the view framework / library in the view layer, do not add view framework specific code in these layers.
* Try and keep the view layer as thin as possible, only UI related code should go here.

## Vertical separation

Vertical separation will organize the app into features. Below is an example of our application that we have created in this repo. The app simply allows users to signin to the app, use the TDEE calculator to detemine how many calories a day they should be eating. It also allows the user to save those calculations as profiles and manage these profiles. So in our example, we break our app into 3 features (vertical separation): User signin / signup, TDEE calculator & Manage profiles.

_Example of our app with horizontal and vertical separation:_

![Separation](/doc-assets/3-layer-separation.png)

# Domain driven design

> You model your business using [Entities](#entity) (the ID matters) and [Value Objects](#model-(value-object)) (the values matter). You use [Repositories](#repository) to retrieve and store them. You create them with the help of [Factories](#factory). If an object is too complex for a single class, you’ll create [Aggregates](#aggregate) that will bind Entities & Value Objects under the same root. If a business logic doesn’t belong to a given object, you’ll define [Services](#service) that will manipulate the involved elements. Eventually, when the [state](#state) of the business changes (a change that matters to business experts), you’ll publish Domain Events to communicate the change. _Gérald Croës_ [Reference link](https://medium.com/the-coding-matrix/ddd-101-the-5-minute-tour-7a3037cf53b8)

__Rule of thumb:__ Bind data and intelligence _(business logic)_ and set boundaries _(horizontal/vertical separation)_ to keep them apart.

# Common web app functionality

_Below is a list of common features / functionality that most web apps have and what layer it will be located in._

* Domain models, Domain services & business logic __(Domain)__
* User permissions to access resources / features of the app __(Domain)__
* User authentication / authorization __(Application services)__
* Ajax requests __(Application services)__
* Utility functions __(Application services)__
* Routing __(App / View)__
* Shared UI components (design system) __(App / View)__
* Views, templates & components __(App / View)__

# Glossary

#### Aggregate

> Collection of objects that are bound together by a root entity. Composition can be used to accomplish this

#### Business Logic

> Business rules that determine how data can be created, stored and updated

#### Container component (Smart component)

> Will usually contain business logic, not directly, this should be done via services that come from the domain layer. Will pass data to [presentation components](#presentation-component-(dumb-component)) and react to events from these components. Container components are also used as top level routable components (pages).

#### DDD

> [Domain Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design)

#### Domain

> A sphere of knowledge or activity

#### Entity

> The actual instance of the object

#### Factory

> A service used to create a model / value object

#### Horizontal separation

> Separate your code into layers

#### Model (Value object)

> Template of an entity. Methods that set / get data. Also includes business logic that relates to the object only. DDD refers to a model as a value object. _Some design patterns state that models should have no business logic, however, DDD (Domain Driven Design) finds this an anti-pattern, and states the model should have business logic if it relates to that object. [Anemic_domain_model](https://en.wikipedia.org/wiki/Anemic_domain_model)_

#### Modular / Module

> A module is an independent unit used to construct a more complex structure. Modular design is an architecture that emplopys multiple modules to build a complex application

#### Presentation component (Dumb component)

> Only concerns itself with presentation of UI. Data is usually passed to presentation components via attributes. Will usually delegate user interaction up to container components via events. Presentation components are great for re-usability. An example would be a button component, it doesn't deal with business logic, it just delegates click events to [container components](#container-component-(smart-component)).

#### Repository

> The storage where objects are stored

#### Service

> When an operation does not conceptually belong to a single object / entity, you will use services to perform that operation / logic. Methods to perform operations with one or more models.

#### State

> The state object or array of objects. The actual data of the entity

#### Store

> Ability to add, update, remove from state. Reactive, notify subscribers

#### Vertical separation

> Separate the app into features
