---
title: Union Any Number of Independent Probabilities
date: 2019-09-21 14:25:00
tags:
- math
- javascript
comments: true
keywords:
- math
- union
- javascript
- probability
- independent events
---

## Just the Code
``` javascript
function unionIndependent(events) {
  let sum = 0;
  let product = 1;
  let sign = 1;

  for (let i = 1; i <= events.length; i++) {
    const eventCombos = bigCombination(events, i).toArray();
    for (let j = 0; j < eventCombos.length; j++) {
      const term = eventCombos[j];
      for (let k = 0; k < term.length; k++) {
        product *= term[k];
      }
      sum += product * sign;
      product = 1;
    }

    sign *= -1;
  }

  return sum;
}
```

## The Problem
If you didn't just come here to look at the answer, then read on! While working on a project that involved some statistics, I ran into an issue that I thought would be just an easy Google to solve. It was not so easy. Hence, this cool post I'm making!


Imagine I have a list of probabilities of different events happening. The events each have no bearing on the chance of one of the other events happening. And I simply want to know what the chance is of AT LEAST ONE of the events happening.

This refers to a "union" of events. And more specifically, this refers to a union of "independent" events. The code above will not work under any other circumstance. But even for this specific scenario, a lot of my Googling led to tools and answers that could only union 2 or 3 events together. Surely, though, there must be an algorithm to union any number of events that I wanted!

## The Solution
I'm not a particularly mathy person, but I can figure some stuff out. Excuse me if it seems like I'm going over the obvious in this post!

The first time I began to envision what a javascript solution would look like was when I saw the following:

P (A U B U C) = P(A) + P(B) + P(C) - P(A ∩ B) - P(A ∩ C) - P(B ∩ C) + P(A ∩ B ∩ C)

The first 3 terms are obvious: the chance of each of the events happening are added together. But P(A)'s chance includes the chance of A happening, as well as A and B, A and C, and even all 3! This goes for P(B) and P(C) as well. When we simply add them all single-combinations together, we double-counted all those events where 2 occur, and triple-counted the event where all 3 occur!

So, for the next 3 terms, we subtract the chance of any 2-combinations occuring to fix our double counting. But every 2-combination added together tripled-counted something! P(A ∩ B) includes the chance of just A and B occuring... but also the chance of P(A ∩ B ∩ C)! This goes for the other 2-combinations as well! So we tripled-added P(A ∩ B ∩ C), then we tripled-subtracted P(A ∩ B ∩ C).

We can fix this by adding P(A ∩ B ∩ C) back in a single time. Finally, we have something that makes sense and gives the union of events!

Extending this idea further... we see that we add all 1-combos together. Subtract all 2-combos. Add all 3-combos. Subtract all 4-combos. Add all 5-combos... and so on! So we have an algorithm down for any number of events.

## Putting it in Code
First, we are going to loop through every number from 1 to the total number of events. We want to deal with all the 1-combinations. Then, all the 2-combinations. Then, all the 3-combinations. And so on! So this loop makes sense:

``` javascript
for (let i = 1; i <= events.length; i++) {
    const eventCombos = bigCombination(events, i).toArray();
```

Second, for each i-combination, we are going to deal with each set of events. So, another embedded loop:

``` javascript
for (let j = 0; j < eventCombos.length; j++) {
    const term = eventCombos[j];
```

For the final embedded loop, we intersect every event in the i-combination. Intersection is easy. You just multiple all the probabilities together!

``` javascript
for (let j = 0; j < eventCombos.length; j++) {
    const term = eventCombos[j];
```

Now to finish up by actually doing things with our intersected event combinations!

``` javascript
      sum += product * sign;
      product = 1;
    }

    sign *= -1;
  }

  return sum;
```

We add (or subtract ) to the sum for each i-combination. After each i-combination, we reverse the sign so that we will do the opposite of add/subtract on the next one. Then, when we are finally done, we can just return the sum!

Really, at the end of the day, the concept and code seem super easy. But it was incredibly difficult until I understood that simplicity. So I hope this post also got you some of the way there to understanding!