---
title: Learning Testing the Hard Way
description: With all the testing dogma out there, hear how Peter learned to follow TDD the hard way
---

Sometimes its easy to feel like you don't have time to do test-driven development. You know what code to write, so it seems like an unnecessary distraction to have to stop and write a test before writing the code you've planned.

I certainly used to feel this way, but then I started working as the primary developer on a big-ish project. At first, everything was great. I was writing new features quickly and everyone was really happy with it. I'd just write the code then quickly click around to make sure it worked properly before releasing it. Then, inevitably, something in the requirements changed. That was no problem &mdash; I knew how the code worked so I jumped in and made the change.

After making a change, though, I had to quickly click around to make sure the new feature worked and that everything connected to the new feature worked the way it did before. And after adding enough new features, the clicking around wasn't so quick. I realized that this repetitive clicking was a huge waste of time.

So I spent a few days backfilling in some capybara-based feature specs to simulate the kinds of clicking I would do. This test-writing after the fact was relatively painful, because I had to read through the code and try to write a test for all the situations the code was meant to handle. Now that I had the tests things were much faster since I could just run them instead of clicking around, but I'd occasionally break something that the tests didn't cover and had to backfill even more tests.

I realized at this point that I could have avoided all of this pain *and* have saved time by writing the tests first. I eventually needed the tests anyway, and I wasted time clicking before I wrote the tests. I also would've had better tests that covered more of the corner cases of the code if I made sure to write the tests first.

That's how I learned the hard way to do test-driven development. I thought it would be helpful to share this cautionary tale so other people don't have to waste their time and learn things the hard way like I did.
