# littlefoot.js

![version](https://badgen.net/npm/v/littlefoot)
![minified + gzip](https://badgen.net/bundlephobia/minzip/littlefoot)
[![Build Status](https://travis-ci.org/goblindegook/littlefoot.svg?branch=master)](https://travis-ci.org/goblindegook/littlefoot)
[![Codacy Badge](https://api.codacy.com/project/badge/grade/d3c8383d65d047118fd7201d8028d823)](https://www.codacy.com/app/goblindegook/littlefoot)
[![Code Climate](https://codeclimate.com/github/goblindegook/littlefoot/badges/gpa.svg)](https://codeclimate.com/github/goblindegook/littlefoot)
[![Dependency Status](https://david-dm.org/goblindegook/littlefoot.svg)](https://david-dm.org/goblindegook/littlefoot)
[![devDependency Status](https://david-dm.org/goblindegook/littlefoot/dev-status.svg)](https://david-dm.org/goblindegook/littlefoot#info=devDependencies)

littlefoot is a lightweight JavaScript library that creates exceptional footnotes. It was forked from [Bigfoot.js](https://github.com/lemonmade/bigfoot/) by [Chris Sauve](http://cmsauve.com/projects) and does not require jQuery.

Simply include the code on your pages and footnotes will be detected automatically and improved in the following ways:

- Links to footnotes will be replaced with clickable/tappable buttons, making them substantially easier to hit.

- Footnote content will appear in a popover directly beside the footnote button when it is clicked/tapped, which cuts out the annoying bouncing around the page that footnotes typically result in.

- The active popovers will be resized and repositioned to ensure that they continue to be completely visible on-screen and aesthetically pleasing: this makes it perfect for mobile devices and responsive designs.

- Supports the markup generated by MultiMarkdown by default.

This project includes the script itself and a default style to apply to the footnote buttons and popovers that are eventually generated. There are also a variety of additional styles that illustrate some of the possibilities for styling these components.

## Installation

Install using NPM:

```shell
$ npm install --save littlefoot
```

Install using Yarn:

```shell
$ yarn add littlefoot
```

## Usage

The script will work with a wide array of markup, but you will need to make sure that your footnote content/link markup at least resembles the markup shown below, which is the format generated by MultiMarkdown:

```html
<!-- Links -->
<p>
  <sup id="fnref:1">
    <a href="#fn:1" rel="footnote">1</a>
  </sup>
</p>

<!-- Footnote List -->
<div class="footnotes">
  <ol>
    <li class="footnote" id="fn:1">
      <p>footnote. <a href="#fnref:1" title="return to article"> ↩</a></p>
      <p></p>
    </li>
  </ol>
</div>
```

Once you've set up the appropriate markup, all you need to do is include the following in your code:

```javascript
var littlefoot = require('littlefoot').default

littlefoot()
```

You can also configure the available options by passing an object literal, and you can store the return object to make use of some of the methods it makes available:

```javascript
var littlefoot = require('littlefoot').default

var lf = littlefoot({
  activateOnHover: true,
  hoverDelay: 250
})
```

You'll also want to include styles for the button and popovers, a number of which come with the script.

### Usage with [Gatsby](https://www.gatsbyjs.org/)

1. [Install littlefoot](#installation) as a dependency in your Gatsby project.

2. At the root of the site's project, create or edit a [`gatsby-browser.js`](https://www.gatsbyjs.org/docs/gatsby-project-structure/#files) file and add the following:

   ```js
   import littlefoot from 'littlefoot'
   import 'littlefoot/dist/littlefoot.css'

   export function onRouteUpdate() {
     littlefoot() // Pass any littlefoot settings here.
   }
   ```

## Options

The script has many configurable options from having popovers instantiated on hover, to allowing multiple active footnotes, to setting specific timeouts for popover activation and dismissal. It also returns an object that allows you to activate and dismiss popovers.

### `activateCallback`

Specifies a function to call on a footnote popover that is being activated (after it is added to the DOM). The function will be passed two arguments: the `popover` DOM element, and the `button` that was activated to show the popover. This option can be useful for adding classes or styling information on the popover.

Default: `undefined`

### `activateDelay`

Sets a delay between the activation of the footnote button and the activation of the actual footnote content.

Default: `100`

### `activateOnHover`

Specifies whether or not the footnote content will be activated when the associated button is hovered over.

Default: `false`

### `allowDuplicates`

Determines whether or not a footnote can be used as the content for multiple footnote buttons. Many content management systems will, on a blog's main page, load every article chronologically without any adjustments to the article markup. This can cause issues if multiple footnotes have the same ID: the footnote content is identified by the fragment identifier in the `href` attribute of the footnote link, so multiple identical IDs can result in the same footnote content being used for different footnote links. This option prevents this by using a footnote as the content for at most one footnote button.

Default: `false`

### `allowMultiple`

Specifies whether or not multiple footnote popovers can be active simultaneously.

Default: `false`

### `anchorPattern`

Specifies the pattern that must be matched by the anchor element's `href` attribute for it to be considered a footnote link. This is used in filtering all links down to just those with a footnote.

Default: `/(fn|footnote|note)[:\-_\d]/gi`

### `anchorParentSelector`

The selector for the parent of the footnote link. This is really only necessary when you want to get rid of that element --- for instance, when the link is inside a `sup` tag. This tag and the link itself will be joined together for attribute from which you can drawn in your markup for footnotes/buttons.

Default: `sup`

### `dismissDelay`

When the footnote content is being removed this option specifies how long after the active class is removed from the footnote before the element is actually removed from the DOM.

Default: `500`

### `dismissOnUnhover`

Determines whether footnotes that were presented when hovering on a footnote button are removed once the footnote button or footnote popover is un-hovered.

Default: `false`

### `footnoteSelector`

The element that contains the footnote content. This element will be hidden and given a `footnote-print-only` class once littlefoot has finished with it.

Default: `'li'`

### `hoverDelay`

If `dismissOnUnhover` is true, this specifies the amount of time (in milliseconds) that must pass after the footnote button/content is un-hovered before the footnote is removed.

Default: `250`

### `numberResetSelector`

A string representing the selector at which you would like the numbering of footnotes to restart at 1. For example, you may be using the numbered style of footnote and wish to have the numbers restart for each `<article>` on your main page with a class of `'article-container'` In this case, you would set this option to `'article.article-container'` (or an equivalent CSS selector). Leaving the option undefined will simply number all footnotes on a given page sequentially.

Default: `undefined`

### `scope`

If any truthy value is provided, only the footnotes within the scope you define will be affected by the script. The scope should be a selector string, as you would typically use in jQuery. For example, setting a scope of `'.littlefoot-active'` would work only on those elements with an ancestor that has a class of `littlefoot-active`.

Default: `undefined`

### `contentTemplate`

A [Lodash template](https://lodash.com/docs#template) for the markup of the footnote content popovers. It's best not to change this too much; the script relies on the class names and hierarchy of the default markup to do its work. However, you can add information to the rendered markup by adding string literals or one or more of the following variables:

- `content`: The HTML markup of the original footnote.
- `number`: The footnote number (sequential ordering of all footnotes within an element matching the `numberResetSelector` option).
- `id`: The footnote identifier (sequential ordering of all footnotes on the page, starting from 1).

Variables should be added between interpolation delimiters. For example, `<%= content %>`.

Default:

```html
<aside
  alt="Footnote <%= number %>"
  class="littlefoot-footnote is-positioned-bottom"
  id="fncontent:<%= id %>"
>
  <div class="littlefoot-footnote__wrapper">
    <div class="littlefoot-footnote__content">
      <%= content %>
    </div>
  </div>
  <div class="littlefoot-footnote__tooltip"></div>
</aside>
```

### `buttonTemplate`

A [Lodash template](https://lodash.com/docs#template) for the markup of the footnote button. Again, try not to remove any elements from the markup, but add as much as you like.

- `content`: The escaped HTML markup of the original footnote.
- `id`: The footnote identifier (sequential ordering of all footnotes on the page, starting from 1).
- `number`: The footnote number (sequential ordering of all footnotes within an element matching the `numberResetSelector` option).
- `reference`: The footnote reference used to populate the ID attribute.

Variables should be added between interpolation delimiters. For example, `<%= content %>`.

Default:

```html
<button
  aria-controls="fncontent:<%= id %>"
  aria-expanded="false"
  aria-label="Footnote <%= number %>"
  class="littlefoot-footnote__button littlefoot-footnote__button__ellipsis"
  id="<%= reference %>"
  rel="footnote"
  title="See Footnote <%= number %>"
>
  <svg viewbox="0 0 31 6" preserveAspectRatio="xMidYMid">
    <circle r="3" cx="3" cy="3" fill="white"></circle>
    <circle r="3" cx="15" cy="3" fill="white"></circle>
    <circle r="3" cx="27" cy="3" fill="white"></circle>
  </svg>
</button>
```

## Methods

Running the function will return an object that can be stored and used to manipulate the footnote buttons/content. The following methods are available in this return object:

### `dismiss([footnoteId[, timeout]])`

This function will close the popover matching the footnote ID. If omitted, all popovers are dismissed. `timeout` specifies the amount of time after the footnote's active class is removed before the element itself is removed. If excluded, `timeout` will default to the `dismissDelay` option.

### `activate(footnoteId)`

This will activate the footnote button (and its associated popover) matching the footnote ID.

### `getSetting(key)`

Returns the instance setting matching the provided string key.

### `updateSetting(key, value)`

Updates the littlefoot instance settings for the provided string key with a new value.

### `unmount()`

This will disable littlefoot and restore the document to its original structure,
clearing event handlers. Once `unmount()` is called, all other methods provided
in the littlefoot instance will stop working, requiring you to call the
`littlefoot()` function again.

## Changes from Bigfoot.js

In forking the Bigfoot.js project and adapting it for simplicity, I have embraced a [_Decisions, not options_](https://nacin.com/2011/12/18/in-open-source-learn-to-decide/) philosophy. As such, some features provided by Bigfoot.js have been replaced with simpler alternatives, a sensible set of defaults, and in some cases removed altogether.

Users planning to migrate from Bigfoot should therefore be aware of the following changes.

### Settings

#### Changed settings

- `allowMultipleFN` was renamed to `allowMultiple`.
- `anchorParentTagname` was renamed to `anchorParentSelector`.
- `deleteOnUnhover` was renamed to `dismissOnUnhover`.
- `footnoteTagname` was renamed to `footnoteSelector`.
- `popoverCreateDelay` was renamed to `activateDelay`.
- `popoverDeleteDelay` was renamed to `dismissDelay`.
- `buttonMarkup` was replaced with `buttonTemplate`. Please refer to the documentation for a list of valid tokens.
- `contentMarkup` was replaced with `contentTemplate`. Please refer to the documentation for a list of valid tokens.
- `useFootnoteOnlyOnce` was replaced with `allowDuplicates`. The truth value should be flipped.

#### Removed settings

- `actionOriginalFN` was removed. All original footnotes are only hidden, leaving you free to select footnote DOM elements for removal if you need them gone from the document.
- `breakpoints` was removed. All size-aware display changes should be declared via CSS `@media` queries.
- `footnoteParentClass` was removed. After some tests, we couldn't determine its purpose or benefits.
- `maxWidthRelativeTo` was removed. It was undocumented and will not be missed.
- `preventPageScroll` was removed. Scrolling inside a scrollable footnote will not trigger a page scroll.
- `positionContent` was removed. Popover positioning is now always in effect.

### Methods

Methods on the returning object were overhauled, removing breakpoint logic.

#### Changed methods

- `activate()` will no longer return a list of activated popovers, it takes a footnote ID instead of a selector, and no longer allows setting a custom class on the popover element through it. Use `activateCallback` if you wish to manipulate the button or popover elements.
- `close()` was renamed `dismiss()`, it optionally takes a footnote ID instead of a selector, and will no longer return the list of deactivated buttons.

#### Removed methods

- `addBreakpoint()` and `removeBreakpoint()` were removed, set breakpoint-dependent styles using CSS.
- The `createPopover()` alias was removed, use `activate()`.
- The `removePopovers()` alias was removed, use `dismiss()`.
- `reposition()` and `repositionFeet()` were removed.

### Presentation

All style variants have been folded into a single stylesheet. The footnote popover is now automatically fixed to the bottom of the viewport on smaller screens, and you may alter this behaviour by overriding the CSS.

Breakpoint methods were dropped in favour of a CSS-based approach. Override the stylesheets to customize screen width limits.

The markup for the footnote button ellipsis changed from three `<svg>` elements with a `<circle>` each to a single `<svg>` element containing all three `<circle>`s.

## License

MIT © [Chris Sauve](http://cmsauve.com/projects) and [Luís Rodrigues](https://goblindegook.com).
