<img src="https://kekse.biz/github.php?draw&override=github:javascript" />

## Index
1. [News](#news)
2. [Scripts](#scripts)
	* [`offset`.js](#offsetjs)
	* [`clone`.js](#clonejs)
	* [`config`.js](#configjs)
	* [`links`.js](#linksjs)
	* [`reflection`.js](#reflectionjs)
	* [`intersect`.js](#intersectjs)
	* [`multiset`.js](#multisetjs)
	* [`measure`.js](#measurejs)
	* [`animation`.js](#animationjs)
	* [`moon`.js](#moonjs)
	* [`street-split`.js](#street-splitjs)
	* [`fold.css`.js](#foldcssjs)
5. [Copyright and License](#copyright-and-license)

## News
* \[**2024-11-04**\] Created the [**`measure`.js**](#measurejs), **v0.1.0**;
* \[**2024-09-24**\] **Moved** the [**`offset`.js**](#offsetjs) script to my [new **`utilities`** repository](https://github.com/kekse1/utilities/);
* \[**2024-09-24**\] Created this repository, to move only the JavaScripts from my [**`scripts` repository**](https://github.com/kekse1/scripts/) to here.

## JavaScripts
My favorite language.. absolutely. **^\_^**

Many, many years ago I just laughed about JavaScript, because it was just some 'browser scripting language'..
TODAY, in the times of [`Node.js`](https://nodejs.org/), it's a great language, even for the server side! **;-)**

Every script is made by myself, arose out of necessity.. or because I found it interesting.

> [!IMPORTANT]
> \[**2024-09-24**\] Moved all this JavaScripts to my [new **`JavaScript`** repository](https://github.com/kekse1/javascript/).

### [`offset`.js](https://github.com/kekse1/utilities/#offsetjs)
**Moved** this one (only) to my [new **`utilities`** repository](https://github.com/kekse1/utilities/#offsetjs),
since I found it to be too useful to get overlooked here.

### [`clone`.js](src/clone.js)
* [Version **v0.4.3**](src/clone.js) (updated **2024-05-09**)

My `Reflect.clone()` extension (because JavaScript doesn't include it natively)..

.. and it works great, really! **:-)** Also checks `Reflect.isExtensible()`, so even functions with
extensions are being fully cloned. And even the functions themselves (if `_function === true`; see also
`DEFAULT_CLONE_FUNCTION`).. and - utilizing a `Map` - every instance will only get cloned **once**, so
**no circular dependencies** occure! **;-)**

### [`config`.js](src/config.js)
* [Version **v0.7.0**](src/config.js) (updated **2024-07-15**)

Using a regular `.json` file/structure. But with improved handling.

> [!IMPORTANT]
> It ain't runnable in a regular JavaScript environment,
> since it's using extensions I've only got in my own code.
> **But** the algorithms and structures should be correct and
> clear when you are looking in the code for yourself.

Example given: { server: { host: 'localhost', { http: { port: 8080 } } } };
You can `.get('server.http.host');` and nevertheless get the `host` above it.

It's possible to receive an array with all upper definitions, and via `_index`
argument to select one (-1 for the last, deepest one, e.g.). You can also FORCE
a concrete item without parents, see '.force()'.

The `.with()` function is meant for e.g. { enabled: (bool) }. It checks all upper
occurencies, if there's at least one (`false/true`) value. So you can 'globally'
disable/enable smth., even if deeper occurencies enable smth. I needed/wanted this;
.. usable by `.enabled()` and `.disabled()` (chooses the test with one of `true/false`).

You can, btw., init with config object using `{,static} wrap(_object, ..)`;
or just argue with such a base object in any constructor argument. AND now
you can also `.extend()` with kinda 'chroot' sub paths (so your query paths
can start in a sub object).. and now, since **v0.6.0** I also support the
'step-wise' traversing up the paths. So not only any chroot path, but **every**
path item (see `Configuration.delim`)!

### [`links`.js](src/links.js)
* [Version **v0.8.3**](src/links.js) (updated **2024-05-02**)

This class extracts all links from `.html` files. It should work better than
regular expressions, since it covers many possible codes. And this class should
be instanciated, so it also works with file chunks (this way, the input data does
not have to be complete, which is great for streams; also to save memory, etc.).

And see the `DEFAULT_ATTRIBS = [ 'href', 'src' ];`; or maybe define a filter,
like the `DEFAULT_SCHEME = [ 'http:', 'https:' ]`, so only these links will
remain in the result array; you can also instanciate with a `source` param
or attrib: from which URL this HTML document comes from, so the links are
adapted to it (relative links could be a problem otherwise).

Since **v0.4.0** also with `DEFAULT_UNIQUE = true`; extra `.extract()` function
(original `.onData()` was meant for stream events); plus some improvements and
bugs fixed. And more **big changes** since **v0.5.0**.

PLUS: since **v0.8.0** it can extract ALL links, not only those from HTML codes;
e.g. `text/plain`; BUT you need (beneath `.all` or `DEFAULT_ALL`) also at least
one `.scheme[]` item..

Nice one; have phun.

### [`reflection`.js](src/reflection.js)
* [Version **v3.1.0**](src/reflection.js) (updated **2024-09-15**)

My solution for JavaScript's `instanceof` problem, so when in multiple environments
the classes are initialized/declared not once. In this case, comparing two environments,
it's like `Array !== Array`, e.g.. and I don't mean only the instances, the base classes
are being created multiple times in multiple environments..

So I'm using `[Reflect.]is()` and `[Reflect.]was()` (for a long time, so it's well tested,
and works great). You'll find _more description_ in this [`reflection`.js](src/reflection.js), in
the starting comment on top of the file.

> [!IMPORTANT]
> Since **v2.1.0** the additional `was()` parameters (varargs) mean **AND**, **not** **OR** any longer..
> But the `is()` stayed the same (**OR**);

> [!TIP]
> In **v3.1.0** **improved/fixed** `Object.{has,get,set,remove}()`** (traversing functions)!

### [`intersect`.js](src/intersect.js)
* [Version **v0.2.2**](src/intersect.js) (created **2024-07-07**)

Intersection for Arrays. Works with any data type (so no optimization like
binary search possible here), and respects multiple occurences (if no (true)
is in your arguments).

**Depends** on my [`multiset`.js](#multisetjs)!!

### [`multiset`.js](src/multiset.js)
* [Version **v0.2.0**](src/multiset.js) (created **2024-04-30**)

My `MultiSet` class: extends `Map`, but works like a `Set`, with the difference
that it also counts the amount of items in this set.

### [`measure`.js](src/measure.js)
* [Version **v0.1.0**](src/measure.js) (created **2024-11-04**)

Two functions to measure the **throughput** of your data, in bytes per millisecond;
and the **ETA** ('Estimated Time Of Arrival'), in milliseconds (multiply with 1000
for seconds).

### [`animation`.js](https://github.com/kekse1/v4/blob/git/src/web/animation.js)
This is just a link to the only [`animation`.js](https://github.com/kekse1/v4/blob/git/src/web/animation.js) of my
[v4 project](https://github.com/kekse1/v4/).

Some extensions to the [**Web Animations API**](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API);
**very** necessary for my special needs.. it's also the one with the most lines.

Maybe useful for you? But you've to read the source for yourself; and some functions may be missing;
then look at my [v4 source code](https://kekse.biz/?~sources)!

### [`moon`.js](src/moon.js)
Extends the `Date` object with moon phase calculation functions.

* [Version **v0.2.3**](src/moon.js) (created **2024-08-04**)

For even more, partially very useful `Date` extensions take a look (for docs and concrete code):
* [**v4**/docs (...)](https://github.com/kekse1/v4/blob/git/docs/modules/lib/date.md)
* [`date.js`](https://github.com/kekse1/v4/blob/git/js/lib/globals/date.js)

### [`street-split`.js](src/street-split.js)
* [Version **v0.2.0**](src/street-split.js) (updated **2024-06-03**)

It's merely kinda **proof of concept** that state parsers can be as good as regular expressions, or even better! **;-D**
See also [**this discussion**](https://www.php.de/forum/webentwicklung/php-einsteiger/1614566-stra%C3%9Fe-und-hausnummer-korrekt-trennen);

### [`fold.css`.js](src/fold.css.js)
* [Version **v0.1.0**](src/fold.css.js) (updated **2024-03-04**)

'Folds' CSS style code. Earlier I used the `fold` (Linux) command, but that didn't work that well for what
I needed the resulting code: had to filter out CSS classes in `.html` code and `grep` for them in many
`.css` files - since `grep` is for lines, and `cut` is too stupid, .. I couldn't find the CSS styles in
stylesheets without newlines, etc. ..

The reason for this script was: I wanted to 'import' GitHub's markdown `.css` code, since [my website](https://kekse.biz/)
[provides all **my GitHub repositories**](https://kekse.biz/?~projects), and I needed only some parts out of there..
but the code is/was a mess!

> [!IMPORTANT]
> Early version, so only the real basics are covered.

# Copyright and License
The Copyright is [(c) Sebastian Kucharczyk](./COPYRIGHT.txt),
and it's licensed under the [MIT](./LICENSE.txt) (also known as 'X' or 'X11' license).

<a href="favicon.512px.png" target="_blank">
<img src="favicon.png" alt="Favicon" />
</a>
