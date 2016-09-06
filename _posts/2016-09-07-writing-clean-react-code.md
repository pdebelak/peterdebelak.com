---
title: Writing Clean React Code
description: Peter has been writing React code at Reverb.com for several months and has learned a thing or two about writing clean React code.
tags:
  - Javascript
  - React
---

At [Reverb.com](https://reverb.com/) we've adopted [React](https://facebook.github.io/react/) as a way to start writing more javascript-centric code in our mostly more traditional server-rendered web app. I recently had to make a minor change to the very first React code I every wrote (all of 9 months ago) and realized that I've learned a lot about how to write clean React code since starting. I thought it would be helpful to share a little bit of what I now know with others.

<h2 class="lead">1. Put state as high up as possible</h2>

If a component has state, nothing above it in the tree of components should care about that state. This means that most of your state should live in your top level component (or inside your flux store if you use some sort of flux library). There are cases where state might be kept in components not at the top level, but the state should be entirely internal. An example would be a component that manages a tabbed interface. It's likely that nothing above that component in the component tree cares about which tab is active so state related to active tabs should be managed inside the tabs component.

Some clues that you might be on the wrong track are:

{% highlight javascript %}
// Setting state from props
class SomeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      aValue: props.aValue,
    };
  }

  // other code
}
{% endhighlight %}

There are cases where this might be acceptable (for example you might set a
tabbed interface's initial tab as props, but not care about which tab is
shown after that), but it is definitely a smell that something might be off.

{% highlight javascript %}
// Setting state from props and then updating from new props
class SomeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      aValue: props.aValue,
    };
  }

  willReceiveProps(nextProps) {
    this.setState({ aValue: nextProps.aValue });
  }

  // other code
}
{% endhighlight %}

Don't do this! If you have state that needs to get updated when props change
then that is clearly not state internal to this component. The state should live
further up in the component tree (and it apparently already does to some degree
since it keeps getting reset from props).

<h2 class="lead">2. POJOs are your friend</h2>

The less logic you have in your React components, the easier they are to test and
reason about. I like to think of React components as a combination of a Rails
controller and view, so you want the components as skinny as possible
and to move the fat into models, which can be plain old javascript objects.
Generally, a plain object is easier to reuse and easier to set up (and thus
easier to test).

You should try to change this:

{% highlight javascript %}
class SomeComponent extends React.Component {
  titleText() {
    if (this.props.thing.title.length > 50) {
      return `${this.props.thing.title.substr(0, 47)}...`;
    }

    return this.props.thing.title;
  }
  render() {
    return (
      <h1>{this.titleText()}</h1>
    );
  }
}
{% endhighlight %}

Into this:

{% highlight javascript %}
class Thing {
  constructor(thingJson) {
    this.thingJson = thingJson;
  }

  get title() {
    if (this.thingJson.title.length > 50) {
      return `${this.thingJson.title.substr(0, 47)}...`;
    }

    return this.thingJson.title;
  }
}

const SomeComponent = ({ thing }) => {
  const thingClass = new Thing(thing);
  return <h1>{thingClass.title}</h1>;
};
{% endhighlight %}

<h2 class="lead">3. Smaller components are better</h2>

Similar to putting your logic into plain old javascript objects, making each of
your components smaller leads to easier reuse and easier understanding.
Ultimately, a whole complicated html page could be written as a single giant
component, but it will be impossible to reuse anything from it or understand any
of it after it has been written. I've learned that if a component has a lot of
logic or state, push most of the rendering into components that mostly just
render html.

I hope these ideas help you write cleaner, easier to use React code from the
start. Let me know if you have any other rules of thumb to avoid making a mess
in your React.
