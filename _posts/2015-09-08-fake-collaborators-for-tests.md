---
title: Fake Collaborators for Tests
description: Use dependency injection to only test the things you care about
tags:
  - Ruby
  - Testing
---

When I was first learning about testing I thought changing your code to make it easier to test was stupid. Since you are only supposed to test the public interface of a class, it seemed like cheating to fake out anything internal to a class. Over time, though, I realized that testing in this way lead to a bunch of unnecessary setup (usually creating a bunch of objects in the database) that I didn't need. Take this typical (if extremely simple) use case class:

{% highlight ruby %}
class PublishArticle
  def initialize(article:)
    @article = article
  end

  def publish
    article.update(state: "published", published_at: Time.now) if should_publish?
  end

  private

  attr_reader :article

  def should_publish?
    ArticlePublishingPolicy.new(article: article).valid?
  end
end
{% endhighlight %}

It's pretty straight-forward &mdash; it just publishes an article if the article meets the article publishing policy. How should we test this? Previously, I would look up what the `ArticlePublishingPolicy` class did and see something like this:

{% highlight ruby %}
class ArticlePublishingPolicy
  def initialize(article:)
    @article = article
  end

  def valid?
    author_in_good_standing? && article_valid?
  end

  private

  attr_reader :article

  def author_in_good_standing?
    article.author.in_good_standing?
  end

  def article_valid?
    article.valid? && article.approved_by_editor?
  end
end
{% endhighlight %}

To use this class I need to have an article that is valid, plus the article needs an author who is in good standing (and what does that mean?). I could create an author, who is in good standing (that would mean looking at the class of the author to see how to make that the case), plus I'd need to make sure I put all the correct information into an article to make it valid for publishing, like marking it approved by and editor. This seems like a lot of work that is totally unrelated to the `PublishArticle` class.

What if I changed the `PublishArticle` class to this?

{% highlight ruby %}
class PublishArticle
  def initialize(article:, policy: nil)
    @article = article
    @policy = policy
  end

  def publish
    article.update(state: "published", published_at: Time.now) if should_publish?
  end

  private

  attr_reader :article

  def should_publish?
    policy.valid?
  end

  def policy
    @policy ||= ArticlePublishingPolicy.new(article: article)
  end
end
{% endhighlight %}

That let's me write tests like this (in rspec, and assuming `Article` responds to `published?`):

{% highlight ruby %}
describe "PublishArticle#publish" do
  let(:article) { Article.new }

  def publish_article
    PublishArticle.new(article: article, policy: policy).publish
  end

  context "policy is valid" do
    let(:policy) { double("ValidPolicy", valid?: true) }

    it "publishes the article" do
      publish_article.should be_published
    end

    it "sets published_at" do
      publish_article.published_at.should_not be_nil
    end
  end

  context "policy is invalid" do
    let(:policy) { double("InvalidPolicy", valid?: false) }

    it "does not publish the article" do
      publish_article.should_not be_published
    end

    it "doesn't set published_at" do
      publish_article.published_at.should be_nil
    end
  end
end
{% endhighlight %}

All of the sudden these tests don't test anything that the `PublishArticle` class doesn't care about. It doesn't need to know about what makes an article valid, so we don't test that here. Testing in this way makes tests faster, clearer, and less likely to change. Now, if something about the `ArticlePublishingPolicy` has to change, there is no reason to change the code in `PublishArticle` or your tests for it. Plus, you don't need to change how you call `PublishArticle` in your production code to use this technique since we've provided sensible defaults.

I hope this encourages people new to testing to change their code just for test purposes. Inject those dependencies!
