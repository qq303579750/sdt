this["arale-dialog"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(20)
	window['jquery'] = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {/*!
	 * jQuery JavaScript Library v1.7.2
	 * http://jquery.com/
	 *
	 * Copyright 2011, John Resig
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 * http://jquery.org/license
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 * Copyright 2011, The Dojo Foundation
	 * Released under the MIT, BSD, and GPL Licenses.
	 *
	 * Date: Wed Mar 21 12:46:34 2012 -0700
	 */
	(function( window, undefined ) {
	
	// Use the correct document accordingly with window argument (sandbox)
	var document = window.document,
		navigator = window.navigator,
		location = window.location;
	var jQuery = (function() {
	
	// Define a local copy of jQuery
	var jQuery = function( selector, context ) {
			// The jQuery object is actually just the init constructor 'enhanced'
			return new jQuery.fn.init( selector, context, rootjQuery );
		},
	
		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,
	
		// Map over the $ in case of overwrite
		_$ = window.$,
	
		// A central reference to the root jQuery(document)
		rootjQuery,
	
		// A simple way to check for HTML strings or ID strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
	
		// Check if a string has a non-whitespace character in it
		rnotwhite = /\S/,
	
		// Used for trimming whitespace
		trimLeft = /^\s+/,
		trimRight = /\s+$/,
	
		// Match a standalone tag
		rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
	
		// JSON RegExp
		rvalidchars = /^[\],:{}\s]*$/,
		rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
		rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
		rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	
		// Useragent RegExp
		rwebkit = /(webkit)[ \/]([\w.]+)/,
		ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
		rmsie = /(msie) ([\w.]+)/,
		rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
	
		// Matches dashed string for camelizing
		rdashAlpha = /-([a-z]|[0-9])/ig,
		rmsPrefix = /^-ms-/,
	
		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return ( letter + "" ).toUpperCase();
		},
	
		// Keep a UserAgent string for use with jQuery.browser
		userAgent = navigator.userAgent,
	
		// For matching the engine and version of the browser
		browserMatch,
	
		// The deferred used on DOM ready
		readyList,
	
		// The ready event handler
		DOMContentLoaded,
	
		// Save a reference to some core methods
		toString = Object.prototype.toString,
		hasOwn = Object.prototype.hasOwnProperty,
		push = Array.prototype.push,
		slice = Array.prototype.slice,
		trim = String.prototype.trim,
		indexOf = Array.prototype.indexOf,
	
		// [[Class]] -> type pairs
		class2type = {};
	
	jQuery.fn = jQuery.prototype = {
		constructor: jQuery,
		init: function( selector, context, rootjQuery ) {
			var match, elem, ret, doc;
	
			// Handle $(""), $(null), or $(undefined)
			if ( !selector ) {
				return this;
			}
	
			// Handle $(DOMElement)
			if ( selector.nodeType ) {
				this.context = this[0] = selector;
				this.length = 1;
				return this;
			}
	
			// The body element only exists once, optimize finding it
			if ( selector === "body" && !context && document.body ) {
				this.context = document;
				this[0] = document.body;
				this.selector = selector;
				this.length = 1;
				return this;
			}
	
			// Handle HTML strings
			if ( typeof selector === "string" ) {
				// Are we dealing with HTML string or an ID?
				if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];
	
				} else {
					match = quickExpr.exec( selector );
				}
	
				// Verify a match, and that no context was specified for #id
				if ( match && (match[1] || !context) ) {
	
					// HANDLE: $(html) -> $(array)
					if ( match[1] ) {
						context = context instanceof jQuery ? context[0] : context;
						doc = ( context ? context.ownerDocument || context : document );
	
						// If a single string is passed in and it's a single tag
						// just do a createElement and skip the rest
						ret = rsingleTag.exec( selector );
	
						if ( ret ) {
							if ( jQuery.isPlainObject( context ) ) {
								selector = [ document.createElement( ret[1] ) ];
								jQuery.fn.attr.call( selector, context, true );
	
							} else {
								selector = [ doc.createElement( ret[1] ) ];
							}
	
						} else {
							ret = jQuery.buildFragment( [ match[1] ], [ doc ] );
							selector = ( ret.cacheable ? jQuery.clone(ret.fragment) : ret.fragment ).childNodes;
						}
	
						return jQuery.merge( this, selector );
	
					// HANDLE: $("#id")
					} else {
						elem = document.getElementById( match[2] );
	
						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document #6963
						if ( elem && elem.parentNode ) {
							// Handle the case where IE and Opera return items
							// by name instead of ID
							if ( elem.id !== match[2] ) {
								return rootjQuery.find( selector );
							}
	
							// Otherwise, we inject the element directly into the jQuery object
							this.length = 1;
							this[0] = elem;
						}
	
						this.context = document;
						this.selector = selector;
						return this;
					}
	
				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || rootjQuery ).find( selector );
	
				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}
	
			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return rootjQuery.ready( selector );
			}
	
			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}
	
			return jQuery.makeArray( selector, this );
		},
	
		// Start with an empty selector
		selector: "",
	
		// The current version of jQuery being used
		jquery: "1.7.2",
	
		// The default length of a jQuery object is 0
		length: 0,
	
		// The number of elements contained in the matched element set
		size: function() {
			return this.length;
		},
	
		toArray: function() {
			return slice.call( this, 0 );
		},
	
		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num == null ?
	
				// Return a 'clean' array
				this.toArray() :
	
				// Return just the object
				( num < 0 ? this[ this.length + num ] : this[ num ] );
		},
	
		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems, name, selector ) {
			// Build a new jQuery matched element set
			var ret = this.constructor();
	
			if ( jQuery.isArray( elems ) ) {
				push.apply( ret, elems );
	
			} else {
				jQuery.merge( ret, elems );
			}
	
			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
	
			ret.context = this.context;
	
			if ( name === "find" ) {
				ret.selector = this.selector + ( this.selector ? " " : "" ) + selector;
			} else if ( name ) {
				ret.selector = this.selector + "." + name + "(" + selector + ")";
			}
	
			// Return the newly-formed element set
			return ret;
		},
	
		// Execute a callback for every element in the matched set.
		// (You can seed the arguments with an array of args, but this is
		// only used internally.)
		each: function( callback, args ) {
			return jQuery.each( this, callback, args );
		},
	
		ready: function( fn ) {
			// Attach the listeners
			jQuery.bindReady();
	
			// Add the callback
			readyList.add( fn );
	
			return this;
		},
	
		eq: function( i ) {
			i = +i;
			return i === -1 ?
				this.slice( i ) :
				this.slice( i, i + 1 );
		},
	
		first: function() {
			return this.eq( 0 );
		},
	
		last: function() {
			return this.eq( -1 );
		},
	
		slice: function() {
			return this.pushStack( slice.apply( this, arguments ),
				"slice", slice.call(arguments).join(",") );
		},
	
		map: function( callback ) {
			return this.pushStack( jQuery.map(this, function( elem, i ) {
				return callback.call( elem, i, elem );
			}));
		},
	
		end: function() {
			return this.prevObject || this.constructor(null);
		},
	
		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: [].sort,
		splice: [].splice
	};
	
	// Give the init function the jQuery prototype for later instantiation
	jQuery.fn.init.prototype = jQuery.fn;
	
	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;
	
		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;
			target = arguments[1] || {};
			// skip the boolean and the target
			i = 2;
		}
	
		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
			target = {};
		}
	
		// extend jQuery itself if only one argument is passed
		if ( length === i ) {
			target = this;
			--i;
		}
	
		for ( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ) {
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];
	
					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}
	
					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];
	
						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}
	
						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );
	
					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
	
		// Return the modified object
		return target;
	};
	
	jQuery.extend({
		noConflict: function( deep ) {
			if ( window.$ === jQuery ) {
				window.$ = _$;
			}
	
			if ( deep && window.jQuery === jQuery ) {
				window.jQuery = _jQuery;
			}
	
			return jQuery;
		},
	
		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,
	
		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,
	
		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},
	
		// Handle when the DOM is ready
		ready: function( wait ) {
			// Either a released hold or an DOMready/load event and not yet ready
			if ( (wait === true && !--jQuery.readyWait) || (wait !== true && !jQuery.isReady) ) {
				// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
				if ( !document.body ) {
					return setTimeout( jQuery.ready, 1 );
				}
	
				// Remember that the DOM is ready
				jQuery.isReady = true;
	
				// If a normal DOM Ready event fired, decrement, and wait if need be
				if ( wait !== true && --jQuery.readyWait > 0 ) {
					return;
				}
	
				// If there are functions bound, to execute
				readyList.fireWith( document, [ jQuery ] );
	
				// Trigger any bound ready events
				if ( jQuery.fn.trigger ) {
					jQuery( document ).trigger( "ready" ).off( "ready" );
				}
			}
		},
	
		bindReady: function() {
			if ( readyList ) {
				return;
			}
	
			readyList = jQuery.Callbacks( "once memory" );
	
			// Catch cases where $(document).ready() is called after the
			// browser event has already occurred.
			if ( document.readyState === "complete" ) {
				// Handle it asynchronously to allow scripts the opportunity to delay ready
				return setTimeout( jQuery.ready, 1 );
			}
	
			// Mozilla, Opera and webkit nightlies currently support this event
			if ( document.addEventListener ) {
				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );
	
				// A fallback to window.onload, that will always work
				window.addEventListener( "load", jQuery.ready, false );
	
			// If IE event model is used
			} else if ( document.attachEvent ) {
				// ensure firing before onload,
				// maybe late but safe also for iframes
				document.attachEvent( "onreadystatechange", DOMContentLoaded );
	
				// A fallback to window.onload, that will always work
				window.attachEvent( "onload", jQuery.ready );
	
				// If IE and not a frame
				// continually check to see if the document is ready
				var toplevel = false;
	
				try {
					toplevel = window.frameElement == null;
				} catch(e) {}
	
				if ( document.documentElement.doScroll && toplevel ) {
					doScrollCheck();
				}
			}
		},
	
		// See test/unit/core.js for details concerning isFunction.
		// Since version 1.3, DOM methods and functions like alert
		// aren't supported. They return false on IE (#2968).
		isFunction: function( obj ) {
			return jQuery.type(obj) === "function";
		},
	
		isArray: Array.isArray || function( obj ) {
			return jQuery.type(obj) === "array";
		},
	
		isWindow: function( obj ) {
			return obj != null && obj == obj.window;
		},
	
		isNumeric: function( obj ) {
			return !isNaN( parseFloat(obj) ) && isFinite( obj );
		},
	
		type: function( obj ) {
			return obj == null ?
				String( obj ) :
				class2type[ toString.call(obj) ] || "object";
		},
	
		isPlainObject: function( obj ) {
			// Must be an Object.
			// Because of IE, we also have to check the presence of the constructor property.
			// Make sure that DOM nodes and window objects don't pass through, as well
			if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}
	
			try {
				// Not own constructor property must be Object
				if ( obj.constructor &&
					!hasOwn.call(obj, "constructor") &&
					!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
					return false;
				}
			} catch ( e ) {
				// IE8,9 Will throw exceptions on certain host objects #9897
				return false;
			}
	
			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own.
	
			var key;
			for ( key in obj ) {}
	
			return key === undefined || hasOwn.call( obj, key );
		},
	
		isEmptyObject: function( obj ) {
			for ( var name in obj ) {
				return false;
			}
			return true;
		},
	
		error: function( msg ) {
			throw new Error( msg );
		},
	
		parseJSON: function( data ) {
			if ( typeof data !== "string" || !data ) {
				return null;
			}
	
			// Make sure leading/trailing whitespace is removed (IE can't handle it)
			data = jQuery.trim( data );
	
			// Attempt to parse using the native JSON parser first
			if ( window.JSON && window.JSON.parse ) {
				return window.JSON.parse( data );
			}
	
			// Make sure the incoming data is actual JSON
			// Logic borrowed from http://json.org/json2.js
			if ( rvalidchars.test( data.replace( rvalidescape, "@" )
				.replace( rvalidtokens, "]" )
				.replace( rvalidbraces, "")) ) {
	
				return ( new Function( "return " + data ) )();
	
			}
			jQuery.error( "Invalid JSON: " + data );
		},
	
		// Cross-browser xml parsing
		parseXML: function( data ) {
			if ( typeof data !== "string" || !data ) {
				return null;
			}
			var xml, tmp;
			try {
				if ( window.DOMParser ) { // Standard
					tmp = new DOMParser();
					xml = tmp.parseFromString( data , "text/xml" );
				} else { // IE
					xml = new ActiveXObject( "Microsoft.XMLDOM" );
					xml.async = "false";
					xml.loadXML( data );
				}
			} catch( e ) {
				xml = undefined;
			}
			if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
				jQuery.error( "Invalid XML: " + data );
			}
			return xml;
		},
	
		noop: function() {},
	
		// Evaluates a script in a global context
		// Workarounds based on findings by Jim Driscoll
		// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
		globalEval: function( data ) {
			if ( data && rnotwhite.test( data ) ) {
				// We use execScript on Internet Explorer
				// We use an anonymous function so that context is window
				// rather than jQuery in Firefox
				( window.execScript || function( data ) {
					window[ "eval" ].call( window, data );
				} )( data );
			}
		},
	
		// Convert dashed to camelCase; used by the css and data modules
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},
	
		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
		},
	
		// args is for internal usage only
		each: function( object, callback, args ) {
			var name, i = 0,
				length = object.length,
				isObj = length === undefined || jQuery.isFunction( object );
	
			if ( args ) {
				if ( isObj ) {
					for ( name in object ) {
						if ( callback.apply( object[ name ], args ) === false ) {
							break;
						}
					}
				} else {
					for ( ; i < length; ) {
						if ( callback.apply( object[ i++ ], args ) === false ) {
							break;
						}
					}
				}
	
			// A special, fast, case for the most common use of each
			} else {
				if ( isObj ) {
					for ( name in object ) {
						if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
							break;
						}
					}
				} else {
					for ( ; i < length; ) {
						if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {
							break;
						}
					}
				}
			}
	
			return object;
		},
	
		// Use native String.trim function wherever possible
		trim: trim ?
			function( text ) {
				return text == null ?
					"" :
					trim.call( text );
			} :
	
			// Otherwise use our own trimming functionality
			function( text ) {
				return text == null ?
					"" :
					text.toString().replace( trimLeft, "" ).replace( trimRight, "" );
			},
	
		// results is for internal usage only
		makeArray: function( array, results ) {
			var ret = results || [];
	
			if ( array != null ) {
				// The window, strings (and functions) also have 'length'
				// Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
				var type = jQuery.type( array );
	
				if ( array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow( array ) ) {
					push.call( ret, array );
				} else {
					jQuery.merge( ret, array );
				}
			}
	
			return ret;
		},
	
		inArray: function( elem, array, i ) {
			var len;
	
			if ( array ) {
				if ( indexOf ) {
					return indexOf.call( array, elem, i );
				}
	
				len = array.length;
				i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;
	
				for ( ; i < len; i++ ) {
					// Skip accessing in sparse arrays
					if ( i in array && array[ i ] === elem ) {
						return i;
					}
				}
			}
	
			return -1;
		},
	
		merge: function( first, second ) {
			var i = first.length,
				j = 0;
	
			if ( typeof second.length === "number" ) {
				for ( var l = second.length; j < l; j++ ) {
					first[ i++ ] = second[ j ];
				}
	
			} else {
				while ( second[j] !== undefined ) {
					first[ i++ ] = second[ j++ ];
				}
			}
	
			first.length = i;
	
			return first;
		},
	
		grep: function( elems, callback, inv ) {
			var ret = [], retVal;
			inv = !!inv;
	
			// Go through the array, only saving the items
			// that pass the validator function
			for ( var i = 0, length = elems.length; i < length; i++ ) {
				retVal = !!callback( elems[ i ], i );
				if ( inv !== retVal ) {
					ret.push( elems[ i ] );
				}
			}
	
			return ret;
		},
	
		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var value, key, ret = [],
				i = 0,
				length = elems.length,
				// jquery objects are treated as arrays
				isArray = elems instanceof jQuery || length !== undefined && typeof length === "number" && ( ( length > 0 && elems[ 0 ] && elems[ length -1 ] ) || length === 0 || jQuery.isArray( elems ) ) ;
	
			// Go through the array, translating each of the items to their
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret[ ret.length ] = value;
					}
				}
	
			// Go through every key on the object,
			} else {
				for ( key in elems ) {
					value = callback( elems[ key ], key, arg );
	
					if ( value != null ) {
						ret[ ret.length ] = value;
					}
				}
			}
	
			// Flatten any nested arrays
			return ret.concat.apply( [], ret );
		},
	
		// A global GUID counter for objects
		guid: 1,
	
		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			if ( typeof context === "string" ) {
				var tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}
	
			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}
	
			// Simulated bind
			var args = slice.call( arguments, 2 ),
				proxy = function() {
					return fn.apply( context, args.concat( slice.call( arguments ) ) );
				};
	
			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;
	
			return proxy;
		},
	
		// Mutifunctional method to get and set values to a collection
		// The value/s can optionally be executed if it's a function
		access: function( elems, fn, key, value, chainable, emptyGet, pass ) {
			var exec,
				bulk = key == null,
				i = 0,
				length = elems.length;
	
			// Sets many values
			if ( key && typeof key === "object" ) {
				for ( i in key ) {
					jQuery.access( elems, fn, i, key[i], 1, emptyGet, value );
				}
				chainable = 1;
	
			// Sets one value
			} else if ( value !== undefined ) {
				// Optionally, function values get executed if exec is true
				exec = pass === undefined && jQuery.isFunction( value );
	
				if ( bulk ) {
					// Bulk operations only iterate when executing function values
					if ( exec ) {
						exec = fn;
						fn = function( elem, key, value ) {
							return exec.call( jQuery( elem ), value );
						};
	
					// Otherwise they run against the entire set
					} else {
						fn.call( elems, value );
						fn = null;
					}
				}
	
				if ( fn ) {
					for (; i < length; i++ ) {
						fn( elems[i], key, exec ? value.call( elems[i], i, fn( elems[i], key ) ) : value, pass );
					}
				}
	
				chainable = 1;
			}
	
			return chainable ?
				elems :
	
				// Gets
				bulk ?
					fn.call( elems ) :
					length ? fn( elems[0], key ) : emptyGet;
		},
	
		now: function() {
			return ( new Date() ).getTime();
		},
	
		// Use of jQuery.browser is frowned upon.
		// More details: http://docs.jquery.com/Utilities/jQuery.browser
		uaMatch: function( ua ) {
			ua = ua.toLowerCase();
	
			var match = rwebkit.exec( ua ) ||
				ropera.exec( ua ) ||
				rmsie.exec( ua ) ||
				ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
				[];
	
			return { browser: match[1] || "", version: match[2] || "0" };
		},
	
		sub: function() {
			function jQuerySub( selector, context ) {
				return new jQuerySub.fn.init( selector, context );
			}
			jQuery.extend( true, jQuerySub, this );
			jQuerySub.superclass = this;
			jQuerySub.fn = jQuerySub.prototype = this();
			jQuerySub.fn.constructor = jQuerySub;
			jQuerySub.sub = this.sub;
			jQuerySub.fn.init = function init( selector, context ) {
				if ( context && context instanceof jQuery && !(context instanceof jQuerySub) ) {
					context = jQuerySub( context );
				}
	
				return jQuery.fn.init.call( this, selector, context, rootjQuerySub );
			};
			jQuerySub.fn.init.prototype = jQuerySub.fn;
			var rootjQuerySub = jQuerySub(document);
			return jQuerySub;
		},
	
		browser: {}
	});
	
	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	});
	
	browserMatch = jQuery.uaMatch( userAgent );
	if ( browserMatch.browser ) {
		jQuery.browser[ browserMatch.browser ] = true;
		jQuery.browser.version = browserMatch.version;
	}
	
	// Deprecated, use jQuery.browser.webkit instead
	if ( jQuery.browser.webkit ) {
		jQuery.browser.safari = true;
	}
	
	// IE doesn't match non-breaking spaces with \s
	if ( rnotwhite.test( "\xA0" ) ) {
		trimLeft = /^[\s\xA0]+/;
		trimRight = /[\s\xA0]+$/;
	}
	
	// All jQuery objects should point back to these
	rootjQuery = jQuery(document);
	
	// Cleanup functions for the document ready method
	if ( document.addEventListener ) {
		DOMContentLoaded = function() {
			document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
			jQuery.ready();
		};
	
	} else if ( document.attachEvent ) {
		DOMContentLoaded = function() {
			// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
			if ( document.readyState === "complete" ) {
				document.detachEvent( "onreadystatechange", DOMContentLoaded );
				jQuery.ready();
			}
		};
	}
	
	// The DOM ready check for Internet Explorer
	function doScrollCheck() {
		if ( jQuery.isReady ) {
			return;
		}
	
		try {
			// If IE is used, use the trick by Diego Perini
			// http://javascript.nwbox.com/IEContentLoaded/
			document.documentElement.doScroll("left");
		} catch(e) {
			setTimeout( doScrollCheck, 1 );
			return;
		}
	
		// and execute any waiting functions
		jQuery.ready();
	}
	
	return jQuery;
	
	})();
	
	
	// String to Object flags format cache
	var flagsCache = {};
	
	// Convert String-formatted flags into Object-formatted ones and store in cache
	function createFlags( flags ) {
		var object = flagsCache[ flags ] = {},
			i, length;
		flags = flags.split( /\s+/ );
		for ( i = 0, length = flags.length; i < length; i++ ) {
			object[ flags[i] ] = true;
		}
		return object;
	}
	
	/*
	 * Create a callback list using the following parameters:
	 *
	 *	flags:	an optional list of space-separated flags that will change how
	 *			the callback list behaves
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible flags:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( flags ) {
	
		// Convert flags from String-formatted to Object-formatted
		// (we check in cache first)
		flags = flags ? ( flagsCache[ flags ] || createFlags( flags ) ) : {};
	
		var // Actual callback list
			list = [],
			// Stack of fire calls for repeatable lists
			stack = [],
			// Last fire value (for non-forgettable lists)
			memory,
			// Flag to know if list was already fired
			fired,
			// Flag to know if list is currently firing
			firing,
			// First callback to fire (used internally by add and fireWith)
			firingStart,
			// End of the loop when firing
			firingLength,
			// Index of currently firing callback (modified by remove if needed)
			firingIndex,
			// Add one or several callbacks to the list
			add = function( args ) {
				var i,
					length,
					elem,
					type,
					actual;
				for ( i = 0, length = args.length; i < length; i++ ) {
					elem = args[ i ];
					type = jQuery.type( elem );
					if ( type === "array" ) {
						// Inspect recursively
						add( elem );
					} else if ( type === "function" ) {
						// Add if not in unique mode and callback is not in
						if ( !flags.unique || !self.has( elem ) ) {
							list.push( elem );
						}
					}
				}
			},
			// Fire callbacks
			fire = function( context, args ) {
				args = args || [];
				memory = !flags.memory || [ context, args ];
				fired = true;
				firing = true;
				firingIndex = firingStart || 0;
				firingStart = 0;
				firingLength = list.length;
				for ( ; list && firingIndex < firingLength; firingIndex++ ) {
					if ( list[ firingIndex ].apply( context, args ) === false && flags.stopOnFalse ) {
						memory = true; // Mark as halted
						break;
					}
				}
				firing = false;
				if ( list ) {
					if ( !flags.once ) {
						if ( stack && stack.length ) {
							memory = stack.shift();
							self.fireWith( memory[ 0 ], memory[ 1 ] );
						}
					} else if ( memory === true ) {
						self.disable();
					} else {
						list = [];
					}
				}
			},
			// Actual Callbacks object
			self = {
				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {
						var length = list.length;
						add( arguments );
						// Do we need to add the callbacks to the
						// current firing batch?
						if ( firing ) {
							firingLength = list.length;
						// With memory, if we're not firing then
						// we should call right away, unless previous
						// firing was halted (stopOnFalse)
						} else if ( memory && memory !== true ) {
							firingStart = length;
							fire( memory[ 0 ], memory[ 1 ] );
						}
					}
					return this;
				},
				// Remove a callback from the list
				remove: function() {
					if ( list ) {
						var args = arguments,
							argIndex = 0,
							argLength = args.length;
						for ( ; argIndex < argLength ; argIndex++ ) {
							for ( var i = 0; i < list.length; i++ ) {
								if ( args[ argIndex ] === list[ i ] ) {
									// Handle firingIndex and firingLength
									if ( firing ) {
										if ( i <= firingLength ) {
											firingLength--;
											if ( i <= firingIndex ) {
												firingIndex--;
											}
										}
									}
									// Remove the element
									list.splice( i--, 1 );
									// If we have some unicity property then
									// we only need to do this once
									if ( flags.unique ) {
										break;
									}
								}
							}
						}
					}
					return this;
				},
				// Control if a given callback is in the list
				has: function( fn ) {
					if ( list ) {
						var i = 0,
							length = list.length;
						for ( ; i < length; i++ ) {
							if ( fn === list[ i ] ) {
								return true;
							}
						}
					}
					return false;
				},
				// Remove all callbacks from the list
				empty: function() {
					list = [];
					return this;
				},
				// Have the list do nothing anymore
				disable: function() {
					list = stack = memory = undefined;
					return this;
				},
				// Is it disabled?
				disabled: function() {
					return !list;
				},
				// Lock the list in its current state
				lock: function() {
					stack = undefined;
					if ( !memory || memory === true ) {
						self.disable();
					}
					return this;
				},
				// Is it locked?
				locked: function() {
					return !stack;
				},
				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( stack ) {
						if ( firing ) {
							if ( !flags.once ) {
								stack.push( [ context, args ] );
							}
						} else if ( !( flags.once && memory ) ) {
							fire( context, args );
						}
					}
					return this;
				},
				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},
				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};
	
		return self;
	};
	
	
	
	
	var // Static reference to slice
		sliceDeferred = [].slice;
	
	jQuery.extend({
	
		Deferred: function( func ) {
			var doneList = jQuery.Callbacks( "once memory" ),
				failList = jQuery.Callbacks( "once memory" ),
				progressList = jQuery.Callbacks( "memory" ),
				state = "pending",
				lists = {
					resolve: doneList,
					reject: failList,
					notify: progressList
				},
				promise = {
					done: doneList.add,
					fail: failList.add,
					progress: progressList.add,
	
					state: function() {
						return state;
					},
	
					// Deprecated
					isResolved: doneList.fired,
					isRejected: failList.fired,
	
					then: function( doneCallbacks, failCallbacks, progressCallbacks ) {
						deferred.done( doneCallbacks ).fail( failCallbacks ).progress( progressCallbacks );
						return this;
					},
					always: function() {
						deferred.done.apply( deferred, arguments ).fail.apply( deferred, arguments );
						return this;
					},
					pipe: function( fnDone, fnFail, fnProgress ) {
						return jQuery.Deferred(function( newDefer ) {
							jQuery.each( {
								done: [ fnDone, "resolve" ],
								fail: [ fnFail, "reject" ],
								progress: [ fnProgress, "notify" ]
							}, function( handler, data ) {
								var fn = data[ 0 ],
									action = data[ 1 ],
									returned;
								if ( jQuery.isFunction( fn ) ) {
									deferred[ handler ](function() {
										returned = fn.apply( this, arguments );
										if ( returned && jQuery.isFunction( returned.promise ) ) {
											returned.promise().then( newDefer.resolve, newDefer.reject, newDefer.notify );
										} else {
											newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
										}
									});
								} else {
									deferred[ handler ]( newDefer[ action ] );
								}
							});
						}).promise();
					},
					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						if ( obj == null ) {
							obj = promise;
						} else {
							for ( var key in promise ) {
								obj[ key ] = promise[ key ];
							}
						}
						return obj;
					}
				},
				deferred = promise.promise({}),
				key;
	
			for ( key in lists ) {
				deferred[ key ] = lists[ key ].fire;
				deferred[ key + "With" ] = lists[ key ].fireWith;
			}
	
			// Handle state
			deferred.done( function() {
				state = "resolved";
			}, failList.disable, progressList.lock ).fail( function() {
				state = "rejected";
			}, doneList.disable, progressList.lock );
	
			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}
	
			// All done!
			return deferred;
		},
	
		// Deferred helper
		when: function( firstParam ) {
			var args = sliceDeferred.call( arguments, 0 ),
				i = 0,
				length = args.length,
				pValues = new Array( length ),
				count = length,
				pCount = length,
				deferred = length <= 1 && firstParam && jQuery.isFunction( firstParam.promise ) ?
					firstParam :
					jQuery.Deferred(),
				promise = deferred.promise();
			function resolveFunc( i ) {
				return function( value ) {
					args[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
					if ( !( --count ) ) {
						deferred.resolveWith( deferred, args );
					}
				};
			}
			function progressFunc( i ) {
				return function( value ) {
					pValues[ i ] = arguments.length > 1 ? sliceDeferred.call( arguments, 0 ) : value;
					deferred.notifyWith( promise, pValues );
				};
			}
			if ( length > 1 ) {
				for ( ; i < length; i++ ) {
					if ( args[ i ] && args[ i ].promise && jQuery.isFunction( args[ i ].promise ) ) {
						args[ i ].promise().then( resolveFunc(i), deferred.reject, progressFunc(i) );
					} else {
						--count;
					}
				}
				if ( !count ) {
					deferred.resolveWith( deferred, args );
				}
			} else if ( deferred !== firstParam ) {
				deferred.resolveWith( deferred, length ? [ firstParam ] : [] );
			}
			return promise;
		}
	});
	
	
	
	
	jQuery.support = (function() {
	
		var support,
			all,
			a,
			select,
			opt,
			input,
			fragment,
			tds,
			events,
			eventName,
			i,
			isSupported,
			div = document.createElement( "div" ),
			documentElement = document.documentElement;
	
		// Preliminary tests
		div.setAttribute("className", "t");
		div.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
	
		all = div.getElementsByTagName( "*" );
		a = div.getElementsByTagName( "a" )[ 0 ];
	
		// Can't get basic test support
		if ( !all || !all.length || !a ) {
			return {};
		}
	
		// First batch of supports tests
		select = document.createElement( "select" );
		opt = select.appendChild( document.createElement("option") );
		input = div.getElementsByTagName( "input" )[ 0 ];
	
		support = {
			// IE strips leading whitespace when .innerHTML is used
			leadingWhitespace: ( div.firstChild.nodeType === 3 ),
	
			// Make sure that tbody elements aren't automatically inserted
			// IE will insert them into empty tables
			tbody: !div.getElementsByTagName("tbody").length,
	
			// Make sure that link elements get serialized correctly by innerHTML
			// This requires a wrapper element in IE
			htmlSerialize: !!div.getElementsByTagName("link").length,
	
			// Get the style information from getAttribute
			// (IE uses .cssText instead)
			style: /top/.test( a.getAttribute("style") ),
	
			// Make sure that URLs aren't manipulated
			// (IE normalizes it by default)
			hrefNormalized: ( a.getAttribute("href") === "/a" ),
	
			// Make sure that element opacity exists
			// (IE uses filter instead)
			// Use a regex to work around a WebKit issue. See #5145
			opacity: /^0.55/.test( a.style.opacity ),
	
			// Verify style float existence
			// (IE uses styleFloat instead of cssFloat)
			cssFloat: !!a.style.cssFloat,
	
			// Make sure that if no value is specified for a checkbox
			// that it defaults to "on".
			// (WebKit defaults to "" instead)
			checkOn: ( input.value === "on" ),
	
			// Make sure that a selected-by-default option has a working selected property.
			// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
			optSelected: opt.selected,
	
			// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
			getSetAttribute: div.className !== "t",
	
			// Tests for enctype support on a form(#6743)
			enctype: !!document.createElement("form").enctype,
	
			// Makes sure cloning an html5 element does not cause problems
			// Where outerHTML is undefined, this still works
			html5Clone: document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>",
	
			// Will be defined later
			submitBubbles: true,
			changeBubbles: true,
			focusinBubbles: false,
			deleteExpando: true,
			noCloneEvent: true,
			inlineBlockNeedsLayout: false,
			shrinkWrapBlocks: false,
			reliableMarginRight: true,
			pixelMargin: true
		};
	
		// jQuery.boxModel DEPRECATED in 1.3, use jQuery.support.boxModel instead
		jQuery.boxModel = support.boxModel = (document.compatMode === "CSS1Compat");
	
		// Make sure checked status is properly cloned
		input.checked = true;
		support.noCloneChecked = input.cloneNode( true ).checked;
	
		// Make sure that the options inside disabled selects aren't marked as disabled
		// (WebKit marks them as disabled)
		select.disabled = true;
		support.optDisabled = !opt.disabled;
	
		// Test to see if it's possible to delete an expando from an element
		// Fails in Internet Explorer
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	
		if ( !div.addEventListener && div.attachEvent && div.fireEvent ) {
			div.attachEvent( "onclick", function() {
				// Cloning a node shouldn't copy over any
				// bound event handlers (IE does this)
				support.noCloneEvent = false;
			});
			div.cloneNode( true ).fireEvent( "onclick" );
		}
	
		// Check if a radio maintains its value
		// after being appended to the DOM
		input = document.createElement("input");
		input.value = "t";
		input.setAttribute("type", "radio");
		support.radioValue = input.value === "t";
	
		input.setAttribute("checked", "checked");
	
		// #11217 - WebKit loses check when the name is after the checked attribute
		input.setAttribute( "name", "t" );
	
		div.appendChild( input );
		fragment = document.createDocumentFragment();
		fragment.appendChild( div.lastChild );
	
		// WebKit doesn't clone checked state correctly in fragments
		support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;
	
		// Check if a disconnected checkbox will retain its checked
		// value of true after appended to the DOM (IE6/7)
		support.appendChecked = input.checked;
	
		fragment.removeChild( input );
		fragment.appendChild( div );
	
		// Technique from Juriy Zaytsev
		// http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
		// We only care about the case where non-standard event systems
		// are used, namely in IE. Short-circuiting here helps us to
		// avoid an eval call (in setAttribute) which can cause CSP
		// to go haywire. See: https://developer.mozilla.org/en/Security/CSP
		if ( div.attachEvent ) {
			for ( i in {
				submit: 1,
				change: 1,
				focusin: 1
			}) {
				eventName = "on" + i;
				isSupported = ( eventName in div );
				if ( !isSupported ) {
					div.setAttribute( eventName, "return;" );
					isSupported = ( typeof div[ eventName ] === "function" );
				}
				support[ i + "Bubbles" ] = isSupported;
			}
		}
	
		fragment.removeChild( div );
	
		// Null elements to avoid leaks in IE
		fragment = select = opt = div = input = null;
	
		// Run tests that need a body at doc ready
		jQuery(function() {
			var container, outer, inner, table, td, offsetSupport,
				marginDiv, conMarginTop, style, html, positionTopLeftWidthHeight,
				paddingMarginBorderVisibility, paddingMarginBorder,
				body = document.getElementsByTagName("body")[0];
	
			if ( !body ) {
				// Return for frameset docs that don't have a body
				return;
			}
	
			conMarginTop = 1;
			paddingMarginBorder = "padding:0;margin:0;border:";
			positionTopLeftWidthHeight = "position:absolute;top:0;left:0;width:1px;height:1px;";
			paddingMarginBorderVisibility = paddingMarginBorder + "0;visibility:hidden;";
			style = "style='" + positionTopLeftWidthHeight + paddingMarginBorder + "5px solid #000;";
			html = "<div " + style + "display:block;'><div style='" + paddingMarginBorder + "0;display:block;overflow:hidden;'></div></div>" +
				"<table " + style + "' cellpadding='0' cellspacing='0'>" +
				"<tr><td></td></tr></table>";
	
			container = document.createElement("div");
			container.style.cssText = paddingMarginBorderVisibility + "width:0;height:0;position:static;top:0;margin-top:" + conMarginTop + "px";
			body.insertBefore( container, body.firstChild );
	
			// Construct the test element
			div = document.createElement("div");
			container.appendChild( div );
	
			// Check if table cells still have offsetWidth/Height when they are set
			// to display:none and there are still other visible table cells in a
			// table row; if so, offsetWidth/Height are not reliable for use when
			// determining if an element has been hidden directly using
			// display:none (it is still safe to use offsets if a parent element is
			// hidden; don safety goggles and see bug #4512 for more information).
			// (only IE 8 fails this test)
			div.innerHTML = "<table><tr><td style='" + paddingMarginBorder + "0;display:none'></td><td>t</td></tr></table>";
			tds = div.getElementsByTagName( "td" );
			isSupported = ( tds[ 0 ].offsetHeight === 0 );
	
			tds[ 0 ].style.display = "";
			tds[ 1 ].style.display = "none";
	
			// Check if empty table cells still have offsetWidth/Height
			// (IE <= 8 fail this test)
			support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );
	
			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. For more
			// info see bug #3333
			// Fails in WebKit before Feb 2011 nightlies
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			if ( window.getComputedStyle ) {
				div.innerHTML = "";
				marginDiv = document.createElement( "div" );
				marginDiv.style.width = "0";
				marginDiv.style.marginRight = "0";
				div.style.width = "2px";
				div.appendChild( marginDiv );
				support.reliableMarginRight =
					( parseInt( ( window.getComputedStyle( marginDiv, null ) || { marginRight: 0 } ).marginRight, 10 ) || 0 ) === 0;
			}
	
			if ( typeof div.style.zoom !== "undefined" ) {
				// Check if natively block-level elements act like inline-block
				// elements when setting their display to 'inline' and giving
				// them layout
				// (IE < 8 does this)
				div.innerHTML = "";
				div.style.width = div.style.padding = "1px";
				div.style.border = 0;
				div.style.overflow = "hidden";
				div.style.display = "inline";
				div.style.zoom = 1;
				support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );
	
				// Check if elements with layout shrink-wrap their children
				// (IE 6 does this)
				div.style.display = "block";
				div.style.overflow = "visible";
				div.innerHTML = "<div style='width:5px;'></div>";
				support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );
			}
	
			div.style.cssText = positionTopLeftWidthHeight + paddingMarginBorderVisibility;
			div.innerHTML = html;
	
			outer = div.firstChild;
			inner = outer.firstChild;
			td = outer.nextSibling.firstChild.firstChild;
	
			offsetSupport = {
				doesNotAddBorder: ( inner.offsetTop !== 5 ),
				doesAddBorderForTableAndCells: ( td.offsetTop === 5 )
			};
	
			inner.style.position = "fixed";
			inner.style.top = "20px";
	
			// safari subtracts parent border width here which is 5px
			offsetSupport.fixedPosition = ( inner.offsetTop === 20 || inner.offsetTop === 15 );
			inner.style.position = inner.style.top = "";
	
			outer.style.overflow = "hidden";
			outer.style.position = "relative";
	
			offsetSupport.subtractsBorderForOverflowNotVisible = ( inner.offsetTop === -5 );
			offsetSupport.doesNotIncludeMarginInBodyOffset = ( body.offsetTop !== conMarginTop );
	
			if ( window.getComputedStyle ) {
				div.style.marginTop = "1%";
				support.pixelMargin = ( window.getComputedStyle( div, null ) || { marginTop: 0 } ).marginTop !== "1%";
			}
	
			if ( typeof container.style.zoom !== "undefined" ) {
				container.style.zoom = 1;
			}
	
			body.removeChild( container );
			marginDiv = div = container = null;
	
			jQuery.extend( support, offsetSupport );
		});
	
		return support;
	})();
	
	
	
	
	var rbrace = /^(?:\{.*\}|\[.*\])$/,
		rmultiDash = /([A-Z])/g;
	
	jQuery.extend({
		cache: {},
	
		// Please use with caution
		uuid: 0,
	
		// Unique for each copy of jQuery on the page
		// Non-digits removed to match rinlinejQuery
		expando: "jQuery" + ( jQuery.fn.jquery + Math.random() ).replace( /\D/g, "" ),
	
		// The following elements throw uncatchable exceptions if you
		// attempt to add expando properties to them.
		noData: {
			"embed": true,
			// Ban all objects except for Flash (which handle expandos)
			"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
			"applet": true
		},
	
		hasData: function( elem ) {
			elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
			return !!elem && !isEmptyDataObject( elem );
		},
	
		data: function( elem, name, data, pvt /* Internal Use Only */ ) {
			if ( !jQuery.acceptData( elem ) ) {
				return;
			}
	
			var privateCache, thisCache, ret,
				internalKey = jQuery.expando,
				getByName = typeof name === "string",
	
				// We have to handle DOM nodes and JS objects differently because IE6-7
				// can't GC object references properly across the DOM-JS boundary
				isNode = elem.nodeType,
	
				// Only DOM nodes need the global jQuery cache; JS object data is
				// attached directly to the object so GC can occur automatically
				cache = isNode ? jQuery.cache : elem,
	
				// Only defining an ID for JS objects if its cache already exists allows
				// the code to shortcut on the same path as a DOM node with no cache
				id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey,
				isEvents = name === "events";
	
			// Avoid doing any more work than we need to when trying to get data on an
			// object that has no data at all
			if ( (!id || !cache[id] || (!isEvents && !pvt && !cache[id].data)) && getByName && data === undefined ) {
				return;
			}
	
			if ( !id ) {
				// Only DOM nodes need a new unique ID for each element since their data
				// ends up in the global cache
				if ( isNode ) {
					elem[ internalKey ] = id = ++jQuery.uuid;
				} else {
					id = internalKey;
				}
			}
	
			if ( !cache[ id ] ) {
				cache[ id ] = {};
	
				// Avoids exposing jQuery metadata on plain JS objects when the object
				// is serialized using JSON.stringify
				if ( !isNode ) {
					cache[ id ].toJSON = jQuery.noop;
				}
			}
	
			// An object can be passed to jQuery.data instead of a key/value pair; this gets
			// shallow copied over onto the existing cache
			if ( typeof name === "object" || typeof name === "function" ) {
				if ( pvt ) {
					cache[ id ] = jQuery.extend( cache[ id ], name );
				} else {
					cache[ id ].data = jQuery.extend( cache[ id ].data, name );
				}
			}
	
			privateCache = thisCache = cache[ id ];
	
			// jQuery data() is stored in a separate object inside the object's internal data
			// cache in order to avoid key collisions between internal data and user-defined
			// data.
			if ( !pvt ) {
				if ( !thisCache.data ) {
					thisCache.data = {};
				}
	
				thisCache = thisCache.data;
			}
	
			if ( data !== undefined ) {
				thisCache[ jQuery.camelCase( name ) ] = data;
			}
	
			// Users should not attempt to inspect the internal events object using jQuery.data,
			// it is undocumented and subject to change. But does anyone listen? No.
			if ( isEvents && !thisCache[ name ] ) {
				return privateCache.events;
			}
	
			// Check for both converted-to-camel and non-converted data property names
			// If a data property was specified
			if ( getByName ) {
	
				// First Try to find as-is property data
				ret = thisCache[ name ];
	
				// Test for null|undefined property data
				if ( ret == null ) {
	
					// Try to find the camelCased property
					ret = thisCache[ jQuery.camelCase( name ) ];
				}
			} else {
				ret = thisCache;
			}
	
			return ret;
		},
	
		removeData: function( elem, name, pvt /* Internal Use Only */ ) {
			if ( !jQuery.acceptData( elem ) ) {
				return;
			}
	
			var thisCache, i, l,
	
				// Reference to internal data cache key
				internalKey = jQuery.expando,
	
				isNode = elem.nodeType,
	
				// See jQuery.data for more information
				cache = isNode ? jQuery.cache : elem,
	
				// See jQuery.data for more information
				id = isNode ? elem[ internalKey ] : internalKey;
	
			// If there is already no cache entry for this object, there is no
			// purpose in continuing
			if ( !cache[ id ] ) {
				return;
			}
	
			if ( name ) {
	
				thisCache = pvt ? cache[ id ] : cache[ id ].data;
	
				if ( thisCache ) {
	
					// Support array or space separated string names for data keys
					if ( !jQuery.isArray( name ) ) {
	
						// try the string as a key before any manipulation
						if ( name in thisCache ) {
							name = [ name ];
						} else {
	
							// split the camel cased version by spaces unless a key with the spaces exists
							name = jQuery.camelCase( name );
							if ( name in thisCache ) {
								name = [ name ];
							} else {
								name = name.split( " " );
							}
						}
					}
	
					for ( i = 0, l = name.length; i < l; i++ ) {
						delete thisCache[ name[i] ];
					}
	
					// If there is no data left in the cache, we want to continue
					// and let the cache object itself get destroyed
					if ( !( pvt ? isEmptyDataObject : jQuery.isEmptyObject )( thisCache ) ) {
						return;
					}
				}
			}
	
			// See jQuery.data for more information
			if ( !pvt ) {
				delete cache[ id ].data;
	
				// Don't destroy the parent cache unless the internal data object
				// had been the only thing left in it
				if ( !isEmptyDataObject(cache[ id ]) ) {
					return;
				}
			}
	
			// Browsers that fail expando deletion also refuse to delete expandos on
			// the window, but it will allow it on all other JS objects; other browsers
			// don't care
			// Ensure that `cache` is not a window object #10080
			if ( jQuery.support.deleteExpando || !cache.setInterval ) {
				delete cache[ id ];
			} else {
				cache[ id ] = null;
			}
	
			// We destroyed the cache and need to eliminate the expando on the node to avoid
			// false lookups in the cache for entries that no longer exist
			if ( isNode ) {
				// IE does not allow us to delete expando properties from nodes,
				// nor does it have a removeAttribute function on Document nodes;
				// we must handle all of these cases
				if ( jQuery.support.deleteExpando ) {
					delete elem[ internalKey ];
				} else if ( elem.removeAttribute ) {
					elem.removeAttribute( internalKey );
				} else {
					elem[ internalKey ] = null;
				}
			}
		},
	
		// For internal use only.
		_data: function( elem, name, data ) {
			return jQuery.data( elem, name, data, true );
		},
	
		// A method for determining if a DOM node can handle the data expando
		acceptData: function( elem ) {
			if ( elem.nodeName ) {
				var match = jQuery.noData[ elem.nodeName.toLowerCase() ];
	
				if ( match ) {
					return !(match === true || elem.getAttribute("classid") !== match);
				}
			}
	
			return true;
		}
	});
	
	jQuery.fn.extend({
		data: function( key, value ) {
			var parts, part, attr, name, l,
				elem = this[0],
				i = 0,
				data = null;
	
			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = jQuery.data( elem );
	
					if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
						attr = elem.attributes;
						for ( l = attr.length; i < l; i++ ) {
							name = attr[i].name;
	
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.substring(5) );
	
								dataAttr( elem, name, data[ name ] );
							}
						}
						jQuery._data( elem, "parsedAttrs", true );
					}
				}
	
				return data;
			}
	
			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each(function() {
					jQuery.data( this, key );
				});
			}
	
			parts = key.split( ".", 2 );
			parts[1] = parts[1] ? "." + parts[1] : "";
			part = parts[1] + "!";
	
			return jQuery.access( this, function( value ) {
	
				if ( value === undefined ) {
					data = this.triggerHandler( "getData" + part, [ parts[0] ] );
	
					// Try to fetch any internally stored data first
					if ( data === undefined && elem ) {
						data = jQuery.data( elem, key );
						data = dataAttr( elem, key, data );
					}
	
					return data === undefined && parts[1] ?
						this.data( parts[0] ) :
						data;
				}
	
				parts[1] = value;
				this.each(function() {
					var self = jQuery( this );
	
					self.triggerHandler( "setData" + part, parts );
					jQuery.data( this, key, value );
					self.triggerHandler( "changeData" + part, parts );
				});
			}, null, value, arguments.length > 1, null, false );
		},
	
		removeData: function( key ) {
			return this.each(function() {
				jQuery.removeData( this, key );
			});
		}
	});
	
	function dataAttr( elem, key, data ) {
		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
	
			var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
	
			data = elem.getAttribute( name );
	
			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					jQuery.isNumeric( data ) ? +data :
						rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
				} catch( e ) {}
	
				// Make sure we set the data so it isn't changed later
				jQuery.data( elem, key, data );
	
			} else {
				data = undefined;
			}
		}
	
		return data;
	}
	
	// checks a cache object for emptiness
	function isEmptyDataObject( obj ) {
		for ( var name in obj ) {
	
			// if the public data object is empty, the private is still empty
			if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
				continue;
			}
			if ( name !== "toJSON" ) {
				return false;
			}
		}
	
		return true;
	}
	
	
	
	
	function handleQueueMarkDefer( elem, type, src ) {
		var deferDataKey = type + "defer",
			queueDataKey = type + "queue",
			markDataKey = type + "mark",
			defer = jQuery._data( elem, deferDataKey );
		if ( defer &&
			( src === "queue" || !jQuery._data(elem, queueDataKey) ) &&
			( src === "mark" || !jQuery._data(elem, markDataKey) ) ) {
			// Give room for hard-coded callbacks to fire first
			// and eventually mark/queue something else on the element
			setTimeout( function() {
				if ( !jQuery._data( elem, queueDataKey ) &&
					!jQuery._data( elem, markDataKey ) ) {
					jQuery.removeData( elem, deferDataKey, true );
					defer.fire();
				}
			}, 0 );
		}
	}
	
	jQuery.extend({
	
		_mark: function( elem, type ) {
			if ( elem ) {
				type = ( type || "fx" ) + "mark";
				jQuery._data( elem, type, (jQuery._data( elem, type ) || 0) + 1 );
			}
		},
	
		_unmark: function( force, elem, type ) {
			if ( force !== true ) {
				type = elem;
				elem = force;
				force = false;
			}
			if ( elem ) {
				type = type || "fx";
				var key = type + "mark",
					count = force ? 0 : ( (jQuery._data( elem, key ) || 1) - 1 );
				if ( count ) {
					jQuery._data( elem, key, count );
				} else {
					jQuery.removeData( elem, key, true );
					handleQueueMarkDefer( elem, type, "mark" );
				}
			}
		},
	
		queue: function( elem, type, data ) {
			var q;
			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				q = jQuery._data( elem, type );
	
				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !q || jQuery.isArray(data) ) {
						q = jQuery._data( elem, type, jQuery.makeArray(data) );
					} else {
						q.push( data );
					}
				}
				return q || [];
			}
		},
	
		dequeue: function( elem, type ) {
			type = type || "fx";
	
			var queue = jQuery.queue( elem, type ),
				fn = queue.shift(),
				hooks = {};
	
			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
			}
	
			if ( fn ) {
				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}
	
				jQuery._data( elem, type + ".run", hooks );
				fn.call( elem, function() {
					jQuery.dequeue( elem, type );
				}, hooks );
			}
	
			if ( !queue.length ) {
				jQuery.removeData( elem, type + "queue " + type + ".run", true );
				handleQueueMarkDefer( elem, type, "queue" );
			}
		}
	});
	
	jQuery.fn.extend({
		queue: function( type, data ) {
			var setter = 2;
	
			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}
	
			if ( arguments.length < setter ) {
				return jQuery.queue( this[0], type );
			}
	
			return data === undefined ?
				this :
				this.each(function() {
					var queue = jQuery.queue( this, type, data );
	
					if ( type === "fx" && queue[0] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				});
		},
		dequeue: function( type ) {
			return this.each(function() {
				jQuery.dequeue( this, type );
			});
		},
		// Based off of the plugin by Clint Helfers, with permission.
		// http://blindsignals.com/index.php/2009/07/jquery-delay/
		delay: function( time, type ) {
			time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
			type = type || "fx";
	
			return this.queue( type, function( next, hooks ) {
				var timeout = setTimeout( next, time );
				hooks.stop = function() {
					clearTimeout( timeout );
				};
			});
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},
		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, object ) {
			if ( typeof type !== "string" ) {
				object = type;
				type = undefined;
			}
			type = type || "fx";
			var defer = jQuery.Deferred(),
				elements = this,
				i = elements.length,
				count = 1,
				deferDataKey = type + "defer",
				queueDataKey = type + "queue",
				markDataKey = type + "mark",
				tmp;
			function resolve() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			}
			while( i-- ) {
				if (( tmp = jQuery.data( elements[ i ], deferDataKey, undefined, true ) ||
						( jQuery.data( elements[ i ], queueDataKey, undefined, true ) ||
							jQuery.data( elements[ i ], markDataKey, undefined, true ) ) &&
						jQuery.data( elements[ i ], deferDataKey, jQuery.Callbacks( "once memory" ), true ) )) {
					count++;
					tmp.add( resolve );
				}
			}
			resolve();
			return defer.promise( object );
		}
	});
	
	
	
	
	var rclass = /[\n\t\r]/g,
		rspace = /\s+/,
		rreturn = /\r/g,
		rtype = /^(?:button|input)$/i,
		rfocusable = /^(?:button|input|object|select|textarea)$/i,
		rclickable = /^a(?:rea)?$/i,
		rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
		getSetAttribute = jQuery.support.getSetAttribute,
		nodeHook, boolHook, fixSpecified;
	
	jQuery.fn.extend({
		attr: function( name, value ) {
			return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
		},
	
		removeAttr: function( name ) {
			return this.each(function() {
				jQuery.removeAttr( this, name );
			});
		},
	
		prop: function( name, value ) {
			return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
		},
	
		removeProp: function( name ) {
			name = jQuery.propFix[ name ] || name;
			return this.each(function() {
				// try/catch handles cases where IE balks (such as removing a property on window)
				try {
					this[ name ] = undefined;
					delete this[ name ];
				} catch( e ) {}
			});
		},
	
		addClass: function( value ) {
			var classNames, i, l, elem,
				setClass, c, cl;
	
			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).addClass( value.call(this, j, this.className) );
				});
			}
	
			if ( value && typeof value === "string" ) {
				classNames = value.split( rspace );
	
				for ( i = 0, l = this.length; i < l; i++ ) {
					elem = this[ i ];
	
					if ( elem.nodeType === 1 ) {
						if ( !elem.className && classNames.length === 1 ) {
							elem.className = value;
	
						} else {
							setClass = " " + elem.className + " ";
	
							for ( c = 0, cl = classNames.length; c < cl; c++ ) {
								if ( !~setClass.indexOf( " " + classNames[ c ] + " " ) ) {
									setClass += classNames[ c ] + " ";
								}
							}
							elem.className = jQuery.trim( setClass );
						}
					}
				}
			}
	
			return this;
		},
	
		removeClass: function( value ) {
			var classNames, i, l, elem, className, c, cl;
	
			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).removeClass( value.call(this, j, this.className) );
				});
			}
	
			if ( (value && typeof value === "string") || value === undefined ) {
				classNames = ( value || "" ).split( rspace );
	
				for ( i = 0, l = this.length; i < l; i++ ) {
					elem = this[ i ];
	
					if ( elem.nodeType === 1 && elem.className ) {
						if ( value ) {
							className = (" " + elem.className + " ").replace( rclass, " " );
							for ( c = 0, cl = classNames.length; c < cl; c++ ) {
								className = className.replace(" " + classNames[ c ] + " ", " ");
							}
							elem.className = jQuery.trim( className );
	
						} else {
							elem.className = "";
						}
					}
				}
			}
	
			return this;
		},
	
		toggleClass: function( value, stateVal ) {
			var type = typeof value,
				isBool = typeof stateVal === "boolean";
	
			if ( jQuery.isFunction( value ) ) {
				return this.each(function( i ) {
					jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
				});
			}
	
			return this.each(function() {
				if ( type === "string" ) {
					// toggle individual class names
					var className,
						i = 0,
						self = jQuery( this ),
						state = stateVal,
						classNames = value.split( rspace );
	
					while ( (className = classNames[ i++ ]) ) {
						// check each className given, space seperated list
						state = isBool ? state : !self.hasClass( className );
						self[ state ? "addClass" : "removeClass" ]( className );
					}
	
				} else if ( type === "undefined" || type === "boolean" ) {
					if ( this.className ) {
						// store className if set
						jQuery._data( this, "__className__", this.className );
					}
	
					// toggle whole className
					this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
				}
			});
		},
	
		hasClass: function( selector ) {
			var className = " " + selector + " ",
				i = 0,
				l = this.length;
			for ( ; i < l; i++ ) {
				if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) > -1 ) {
					return true;
				}
			}
	
			return false;
		},
	
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[0];
	
			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];
	
					if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
						return ret;
					}
	
					ret = elem.value;
	
					return typeof ret === "string" ?
						// handle most common string cases
						ret.replace(rreturn, "") :
						// handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}
	
				return;
			}
	
			isFunction = jQuery.isFunction( value );
	
			return this.each(function( i ) {
				var self = jQuery(this), val;
	
				if ( this.nodeType !== 1 ) {
					return;
				}
	
				if ( isFunction ) {
					val = value.call( this, i, self.val() );
				} else {
					val = value;
				}
	
				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";
				} else if ( typeof val === "number" ) {
					val += "";
				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map(val, function ( value ) {
						return value == null ? "" : value + "";
					});
				}
	
				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];
	
				// If set returns undefined, fall back to normal setting
				if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			});
		}
	});
	
	jQuery.extend({
		valHooks: {
			option: {
				get: function( elem ) {
					// attributes.value is undefined in Blackberry 4.7 but
					// uses .value. See #6932
					var val = elem.attributes.value;
					return !val || val.specified ? elem.value : elem.text;
				}
			},
			select: {
				get: function( elem ) {
					var value, i, max, option,
						index = elem.selectedIndex,
						values = [],
						options = elem.options,
						one = elem.type === "select-one";
	
					// Nothing was selected
					if ( index < 0 ) {
						return null;
					}
	
					// Loop through all the selected options
					i = one ? index : 0;
					max = one ? index + 1 : options.length;
					for ( ; i < max; i++ ) {
						option = options[ i ];
	
						// Don't return options that are disabled or in a disabled optgroup
						if ( option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
								(!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" )) ) {
	
							// Get the specific value for the option
							value = jQuery( option ).val();
	
							// We don't need an array for one selects
							if ( one ) {
								return value;
							}
	
							// Multi-Selects return an array
							values.push( value );
						}
					}
	
					// Fixes Bug #2551 -- select.val() broken in IE after form.reset()
					if ( one && !values.length && options.length ) {
						return jQuery( options[ index ] ).val();
					}
	
					return values;
				},
	
				set: function( elem, value ) {
					var values = jQuery.makeArray( value );
	
					jQuery(elem).find("option").each(function() {
						this.selected = jQuery.inArray( jQuery(this).val(), values ) >= 0;
					});
	
					if ( !values.length ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		},
	
		attrFn: {
			val: true,
			css: true,
			html: true,
			text: true,
			data: true,
			width: true,
			height: true,
			offset: true
		},
	
		attr: function( elem, name, value, pass ) {
			var ret, hooks, notxml,
				nType = elem.nodeType;
	
			// don't get/set attributes on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			if ( pass && name in jQuery.attrFn ) {
				return jQuery( elem )[ name ]( value );
			}
	
			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}
	
			notxml = nType !== 1 || !jQuery.isXMLDoc( elem );
	
			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( notxml ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
			}
	
			if ( value !== undefined ) {
	
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
	
				} else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {
					return ret;
	
				} else {
					elem.setAttribute( name, "" + value );
					return value;
				}
	
			} else if ( hooks && "get" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {
				return ret;
	
			} else {
	
				ret = elem.getAttribute( name );
	
				// Non-existent attributes return null, we normalize to undefined
				return ret === null ?
					undefined :
					ret;
			}
		},
	
		removeAttr: function( elem, value ) {
			var propName, attrNames, name, l, isBool,
				i = 0;
	
			if ( value && elem.nodeType === 1 ) {
				attrNames = value.toLowerCase().split( rspace );
				l = attrNames.length;
	
				for ( ; i < l; i++ ) {
					name = attrNames[ i ];
	
					if ( name ) {
						propName = jQuery.propFix[ name ] || name;
						isBool = rboolean.test( name );
	
						// See #9699 for explanation of this approach (setting first, then removal)
						// Do not do this for boolean attributes (see #10870)
						if ( !isBool ) {
							jQuery.attr( elem, name, "" );
						}
						elem.removeAttribute( getSetAttribute ? name : propName );
	
						// Set corresponding property to false for boolean attributes
						if ( isBool && propName in elem ) {
							elem[ propName ] = false;
						}
					}
				}
			}
		},
	
		attrHooks: {
			type: {
				set: function( elem, value ) {
					// We can't allow the type property to be changed (since it causes problems in IE)
					if ( rtype.test( elem.nodeName ) && elem.parentNode ) {
						jQuery.error( "type property can't be changed" );
					} else if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
						// Setting the type on a radio button after the value resets the value in IE6-9
						// Reset value to it's default in case type is set after value
						// This is for element creation
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			},
			// Use the value property for back compat
			// Use the nodeHook for button elements in IE6/7 (#1954)
			value: {
				get: function( elem, name ) {
					if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
						return nodeHook.get( elem, name );
					}
					return name in elem ?
						elem.value :
						null;
				},
				set: function( elem, value, name ) {
					if ( nodeHook && jQuery.nodeName( elem, "button" ) ) {
						return nodeHook.set( elem, value, name );
					}
					// Does not return so that setAttribute is also used
					elem.value = value;
				}
			}
		},
	
		propFix: {
			tabindex: "tabIndex",
			readonly: "readOnly",
			"for": "htmlFor",
			"class": "className",
			maxlength: "maxLength",
			cellspacing: "cellSpacing",
			cellpadding: "cellPadding",
			rowspan: "rowSpan",
			colspan: "colSpan",
			usemap: "useMap",
			frameborder: "frameBorder",
			contenteditable: "contentEditable"
		},
	
		prop: function( elem, name, value ) {
			var ret, hooks, notxml,
				nType = elem.nodeType;
	
			// don't get/set properties on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			notxml = nType !== 1 || !jQuery.isXMLDoc( elem );
	
			if ( notxml ) {
				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}
	
			if ( value !== undefined ) {
				if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
					return ret;
	
				} else {
					return ( elem[ name ] = value );
				}
	
			} else {
				if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
					return ret;
	
				} else {
					return elem[ name ];
				}
			}
		},
	
		propHooks: {
			tabIndex: {
				get: function( elem ) {
					// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
					// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					var attributeNode = elem.getAttributeNode("tabindex");
	
					return attributeNode && attributeNode.specified ?
						parseInt( attributeNode.value, 10 ) :
						rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							undefined;
				}
			}
		}
	});
	
	// Add the tabIndex propHook to attrHooks for back-compat (different case is intentional)
	jQuery.attrHooks.tabindex = jQuery.propHooks.tabIndex;
	
	// Hook for boolean attributes
	boolHook = {
		get: function( elem, name ) {
			// Align boolean attributes with corresponding properties
			// Fall back to attribute presence where some booleans are not supported
			var attrNode,
				property = jQuery.prop( elem, name );
			return property === true || typeof property !== "boolean" && ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?
				name.toLowerCase() :
				undefined;
		},
		set: function( elem, value, name ) {
			var propName;
			if ( value === false ) {
				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				// value is true since we know at this point it's type boolean and not false
				// Set boolean attributes to the same name and set the DOM property
				propName = jQuery.propFix[ name ] || name;
				if ( propName in elem ) {
					// Only set the IDL specifically if it already exists on the element
					elem[ propName ] = true;
				}
	
				elem.setAttribute( name, name.toLowerCase() );
			}
			return name;
		}
	};
	
	// IE6/7 do not support getting/setting some attributes with get/setAttribute
	if ( !getSetAttribute ) {
	
		fixSpecified = {
			name: true,
			id: true,
			coords: true
		};
	
		// Use this for any attribute in IE6/7
		// This fixes almost every IE6/7 issue
		nodeHook = jQuery.valHooks.button = {
			get: function( elem, name ) {
				var ret;
				ret = elem.getAttributeNode( name );
				return ret && ( fixSpecified[ name ] ? ret.nodeValue !== "" : ret.specified ) ?
					ret.nodeValue :
					undefined;
			},
			set: function( elem, value, name ) {
				// Set the existing or create a new attribute node
				var ret = elem.getAttributeNode( name );
				if ( !ret ) {
					ret = document.createAttribute( name );
					elem.setAttributeNode( ret );
				}
				return ( ret.nodeValue = value + "" );
			}
		};
	
		// Apply the nodeHook to tabindex
		jQuery.attrHooks.tabindex.set = nodeHook.set;
	
		// Set width and height to auto instead of 0 on empty string( Bug #8150 )
		// This is for removals
		jQuery.each([ "width", "height" ], function( i, name ) {
			jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
				set: function( elem, value ) {
					if ( value === "" ) {
						elem.setAttribute( name, "auto" );
						return value;
					}
				}
			});
		});
	
		// Set contenteditable to false on removals(#10429)
		// Setting to empty string throws an error as an invalid value
		jQuery.attrHooks.contenteditable = {
			get: nodeHook.get,
			set: function( elem, value, name ) {
				if ( value === "" ) {
					value = "false";
				}
				nodeHook.set( elem, value, name );
			}
		};
	}
	
	
	// Some attributes require a special call on IE
	if ( !jQuery.support.hrefNormalized ) {
		jQuery.each([ "href", "src", "width", "height" ], function( i, name ) {
			jQuery.attrHooks[ name ] = jQuery.extend( jQuery.attrHooks[ name ], {
				get: function( elem ) {
					var ret = elem.getAttribute( name, 2 );
					return ret === null ? undefined : ret;
				}
			});
		});
	}
	
	if ( !jQuery.support.style ) {
		jQuery.attrHooks.style = {
			get: function( elem ) {
				// Return undefined in the case of empty string
				// Normalize to lowercase since IE uppercases css property names
				return elem.style.cssText.toLowerCase() || undefined;
			},
			set: function( elem, value ) {
				return ( elem.style.cssText = "" + value );
			}
		};
	}
	
	// Safari mis-reports the default selected property of an option
	// Accessing the parent's selectedIndex property fixes it
	if ( !jQuery.support.optSelected ) {
		jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
			get: function( elem ) {
				var parent = elem.parentNode;
	
				if ( parent ) {
					parent.selectedIndex;
	
					// Make sure that it also works with optgroups, see #5701
					if ( parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
				}
				return null;
			}
		});
	}
	
	// IE6/7 call enctype encoding
	if ( !jQuery.support.enctype ) {
		jQuery.propFix.enctype = "encoding";
	}
	
	// Radios and checkboxes getter/setter
	if ( !jQuery.support.checkOn ) {
		jQuery.each([ "radio", "checkbox" ], function() {
			jQuery.valHooks[ this ] = {
				get: function( elem ) {
					// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
					return elem.getAttribute("value") === null ? "on" : elem.value;
				}
			};
		});
	}
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = jQuery.extend( jQuery.valHooks[ this ], {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
				}
			}
		});
	});
	
	
	
	
	var rformElems = /^(?:textarea|input|select)$/i,
		rtypenamespace = /^([^\.]*)?(?:\.(.+))?$/,
		rhoverHack = /(?:^|\s)hover(\.\S+)?\b/,
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|contextmenu)|click/,
		rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
		rquickIs = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
		quickParse = function( selector ) {
			var quick = rquickIs.exec( selector );
			if ( quick ) {
				//   0  1    2   3
				// [ _, tag, id, class ]
				quick[1] = ( quick[1] || "" ).toLowerCase();
				quick[3] = quick[3] && new RegExp( "(?:^|\\s)" + quick[3] + "(?:\\s|$)" );
			}
			return quick;
		},
		quickIs = function( elem, m ) {
			var attrs = elem.attributes || {};
			return (
				(!m[1] || elem.nodeName.toLowerCase() === m[1]) &&
				(!m[2] || (attrs.id || {}).value === m[2]) &&
				(!m[3] || m[3].test( (attrs[ "class" ] || {}).value ))
			);
		},
		hoverHack = function( events ) {
			return jQuery.event.special.hover ? events : events.replace( rhoverHack, "mouseenter$1 mouseleave$1" );
		};
	
	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {
	
		add: function( elem, types, handler, data, selector ) {
	
			var elemData, eventHandle, events,
				t, tns, type, namespaces, handleObj,
				handleObjIn, quick, handlers, special;
	
			// Don't attach events to noData or text/comment nodes (allow plain objects tho)
			if ( elem.nodeType === 3 || elem.nodeType === 8 || !types || !handler || !(elemData = jQuery._data( elem )) ) {
				return;
			}
	
			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}
	
			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}
	
			// Init the element's event structure and main handler, if this is the first
			events = elemData.events;
			if ( !events ) {
				elemData.events = events = {};
			}
			eventHandle = elemData.handle;
			if ( !eventHandle ) {
				elemData.handle = eventHandle = function( e ) {
					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && (!e || jQuery.event.triggered !== e.type) ?
						jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
						undefined;
				};
				// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
				eventHandle.elem = elem;
			}
	
			// Handle multiple events separated by a space
			// jQuery(...).bind("mouseover mouseout", fn);
			types = jQuery.trim( hoverHack(types) ).split( " " );
			for ( t = 0; t < types.length; t++ ) {
	
				tns = rtypenamespace.exec( types[t] ) || [];
				type = tns[1];
				namespaces = ( tns[2] || "" ).split( "." ).sort();
	
				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};
	
				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;
	
				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};
	
				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: tns[1],
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					quick: selector && quickParse( selector ),
					namespace: namespaces.join(".")
				}, handleObjIn );
	
				// Init the event handler queue if we're the first
				handlers = events[ type ];
				if ( !handlers ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;
	
					// Only use addEventListener/attachEvent if the special events handler returns false
					if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
						// Bind the global event handler to the element
						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle, false );
	
						} else if ( elem.attachEvent ) {
							elem.attachEvent( "on" + type, eventHandle );
						}
					}
				}
	
				if ( special.add ) {
					special.add.call( elem, handleObj );
	
					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}
	
				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}
	
				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}
	
			// Nullify elem to prevent memory leaks in IE
			elem = null;
		},
	
		global: {},
	
		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {
	
			var elemData = jQuery.hasData( elem ) && jQuery._data( elem ),
				t, tns, type, origType, namespaces, origCount,
				j, events, special, handle, eventType, handleObj;
	
			if ( !elemData || !(events = elemData.events) ) {
				return;
			}
	
			// Once for each type.namespace in types; type may be omitted
			types = jQuery.trim( hoverHack( types || "" ) ).split(" ");
			for ( t = 0; t < types.length; t++ ) {
				tns = rtypenamespace.exec( types[t] ) || [];
				type = origType = tns[1];
				namespaces = tns[2];
	
				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}
	
				special = jQuery.event.special[ type ] || {};
				type = ( selector? special.delegateType : special.bindType ) || type;
				eventType = events[ type ] || [];
				origCount = eventType.length;
				namespaces = namespaces ? new RegExp("(^|\\.)" + namespaces.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
	
				// Remove matching events
				for ( j = 0; j < eventType.length; j++ ) {
					handleObj = eventType[ j ];
	
					if ( ( mappedTypes || origType === handleObj.origType ) &&
						 ( !handler || handler.guid === handleObj.guid ) &&
						 ( !namespaces || namespaces.test( handleObj.namespace ) ) &&
						 ( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
						eventType.splice( j--, 1 );
	
						if ( handleObj.selector ) {
							eventType.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}
	
				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( eventType.length === 0 && origCount !== eventType.length ) {
					if ( !special.teardown || special.teardown.call( elem, namespaces ) === false ) {
						jQuery.removeEvent( elem, type, elemData.handle );
					}
	
					delete events[ type ];
				}
			}
	
			// Remove the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				handle = elemData.handle;
				if ( handle ) {
					handle.elem = null;
				}
	
				// removeData also checks for emptiness and clears the expando if empty
				// so use it instead of delete
				jQuery.removeData( elem, [ "events", "handle" ], true );
			}
		},
	
		// Events that are safe to short-circuit if no handlers are attached.
		// Native DOM events should not be added, they may have inline handlers.
		customEvent: {
			"getData": true,
			"setData": true,
			"changeData": true
		},
	
		trigger: function( event, data, elem, onlyHandlers ) {
			// Don't do events on text and comment nodes
			if ( elem && (elem.nodeType === 3 || elem.nodeType === 8) ) {
				return;
			}
	
			// Event object or event type
			var type = event.type || event,
				namespaces = [],
				cache, exclusive, i, cur, old, ontype, special, handle, eventPath, bubbleType;
	
			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}
	
			if ( type.indexOf( "!" ) >= 0 ) {
				// Exclusive events trigger only for the exact event (no namespaces)
				type = type.slice(0, -1);
				exclusive = true;
			}
	
			if ( type.indexOf( "." ) >= 0 ) {
				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
	
			if ( (!elem || jQuery.event.customEvent[ type ]) && !jQuery.event.global[ type ] ) {
				// No jQuery handlers for this event type, and it can't have inline handlers
				return;
			}
	
			// Caller can pass in an Event, Object, or just an event type string
			event = typeof event === "object" ?
				// jQuery.Event object
				event[ jQuery.expando ] ? event :
				// Object literal
				new jQuery.Event( type, event ) :
				// Just the event type (string)
				new jQuery.Event( type );
	
			event.type = type;
			event.isTrigger = true;
			event.exclusive = exclusive;
			event.namespace = namespaces.join( "." );
			event.namespace_re = event.namespace? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
			ontype = type.indexOf( ":" ) < 0 ? "on" + type : "";
	
			// Handle a global trigger
			if ( !elem ) {
	
				// TODO: Stop taunting the data cache; remove global events and always attach to document
				cache = jQuery.cache;
				for ( i in cache ) {
					if ( cache[ i ].events && cache[ i ].events[ type ] ) {
						jQuery.event.trigger( event, data, cache[ i ].handle.elem, true );
					}
				}
				return;
			}
	
			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}
	
			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data != null ? jQuery.makeArray( data ) : [];
			data.unshift( event );
	
			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}
	
			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			eventPath = [[ elem, special.bindType || type ]];
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {
	
				bubbleType = special.delegateType || type;
				cur = rfocusMorph.test( bubbleType + type ) ? elem : elem.parentNode;
				old = null;
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push([ cur, bubbleType ]);
					old = cur;
				}
	
				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( old && old === elem.ownerDocument ) {
					eventPath.push([ old.defaultView || old.parentWindow || window, bubbleType ]);
				}
			}
	
			// Fire handlers on the event path
			for ( i = 0; i < eventPath.length && !event.isPropagationStopped(); i++ ) {
	
				cur = eventPath[i][0];
				event.type = eventPath[i][1];
	
				handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}
				// Note that this is a bare JS function and not a jQuery handler
				handle = ontype && cur[ ontype ];
				if ( handle && jQuery.acceptData( cur ) && handle.apply( cur, data ) === false ) {
					event.preventDefault();
				}
			}
			event.type = type;
	
			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {
	
				if ( (!special._default || special._default.apply( elem.ownerDocument, data ) === false) &&
					!(type === "click" && jQuery.nodeName( elem, "a" )) && jQuery.acceptData( elem ) ) {
	
					// Call a native DOM method on the target with the same name name as the event.
					// Can't use an .isFunction() check here because IE6/7 fails that test.
					// Don't do default actions on window, that's where global variables be (#6170)
					// IE<9 dies on focus/blur to hidden element (#1486)
					if ( ontype && elem[ type ] && ((type !== "focus" && type !== "blur") || event.target.offsetWidth !== 0) && !jQuery.isWindow( elem ) ) {
	
						// Don't re-trigger an onFOO event when we call its FOO() method
						old = elem[ ontype ];
	
						if ( old ) {
							elem[ ontype ] = null;
						}
	
						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;
	
						if ( old ) {
							elem[ ontype ] = old;
						}
					}
				}
			}
	
			return event.result;
		},
	
		dispatch: function( event ) {
	
			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event || window.event );
	
			var handlers = ( (jQuery._data( this, "events" ) || {} )[ event.type ] || []),
				delegateCount = handlers.delegateCount,
				args = [].slice.call( arguments, 0 ),
				run_all = !event.exclusive && !event.namespace,
				special = jQuery.event.special[ event.type ] || {},
				handlerQueue = [],
				i, j, cur, jqcur, ret, selMatch, matched, matches, handleObj, sel, related;
	
			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;
			event.delegateTarget = this;
	
			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}
	
			// Determine handlers that should run if there are delegated events
			// Avoid non-left-click bubbling in Firefox (#3861)
			if ( delegateCount && !(event.button && event.type === "click") ) {
	
				// Pregenerate a single jQuery object for reuse with .is()
				jqcur = jQuery(this);
				jqcur.context = this.ownerDocument || this;
	
				for ( cur = event.target; cur != this; cur = cur.parentNode || this ) {
	
					// Don't process events on disabled elements (#6911, #8165)
					if ( cur.disabled !== true ) {
						selMatch = {};
						matches = [];
						jqcur[0] = cur;
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];
							sel = handleObj.selector;
	
							if ( selMatch[ sel ] === undefined ) {
								selMatch[ sel ] = (
									handleObj.quick ? quickIs( cur, handleObj.quick ) : jqcur.is( sel )
								);
							}
							if ( selMatch[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push({ elem: cur, matches: matches });
						}
					}
				}
			}
	
			// Add the remaining (directly-bound) handlers
			if ( handlers.length > delegateCount ) {
				handlerQueue.push({ elem: this, matches: handlers.slice( delegateCount ) });
			}
	
			// Run delegates first; they may want to stop propagation beneath us
			for ( i = 0; i < handlerQueue.length && !event.isPropagationStopped(); i++ ) {
				matched = handlerQueue[ i ];
				event.currentTarget = matched.elem;
	
				for ( j = 0; j < matched.matches.length && !event.isImmediatePropagationStopped(); j++ ) {
					handleObj = matched.matches[ j ];
	
					// Triggered event must either 1) be non-exclusive and have no namespace, or
					// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
					if ( run_all || (!event.namespace && !handleObj.namespace) || event.namespace_re && event.namespace_re.test( handleObj.namespace ) ) {
	
						event.data = handleObj.data;
						event.handleObj = handleObj;
	
						ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
								.apply( matched.elem, args );
	
						if ( ret !== undefined ) {
							event.result = ret;
							if ( ret === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}
	
			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}
	
			return event.result;
		},
	
		// Includes some event props shared by KeyEvent and MouseEvent
		// *** attrChange attrName relatedNode srcElement  are not normalized, non-W3C, deprecated, will be removed in 1.8 ***
		props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
	
		fixHooks: {},
	
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function( event, original ) {
	
				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}
	
				return event;
			}
		},
	
		mouseHooks: {
			props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button,
					fromElement = original.fromElement;
	
				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;
	
					event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}
	
				// Add relatedTarget, if necessary
				if ( !event.relatedTarget && fromElement ) {
					event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
				}
	
				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}
	
				return event;
			}
		},
	
		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}
	
			// Create a writable copy of the event object and normalize some properties
			var i, prop,
				originalEvent = event,
				fixHook = jQuery.event.fixHooks[ event.type ] || {},
				copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;
	
			event = jQuery.Event( originalEvent );
	
			for ( i = copy.length; i; ) {
				prop = copy[ --i ];
				event[ prop ] = originalEvent[ prop ];
			}
	
			// Fix target property, if necessary (#1925, IE 6/7/8 & Safari2)
			if ( !event.target ) {
				event.target = originalEvent.srcElement || document;
			}
	
			// Target should not be a text node (#504, Safari)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}
	
			// For mouse/key events; add metaKey if it's not there (#3368, IE6/7/8)
			if ( event.metaKey === undefined ) {
				event.metaKey = event.ctrlKey;
			}
	
			return fixHook.filter? fixHook.filter( event, originalEvent ) : event;
		},
	
		special: {
			ready: {
				// Make sure the ready event is setup
				setup: jQuery.bindReady
			},
	
			load: {
				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
	
			focus: {
				delegateType: "focusin"
			},
			blur: {
				delegateType: "focusout"
			},
	
			beforeunload: {
				setup: function( data, namespaces, eventHandle ) {
					// We only want to do this special case on windows
					if ( jQuery.isWindow( this ) ) {
						this.onbeforeunload = eventHandle;
					}
				},
	
				teardown: function( namespaces, eventHandle ) {
					if ( this.onbeforeunload === eventHandle ) {
						this.onbeforeunload = null;
					}
				}
			}
		},
	
		simulate: function( type, elem, event, bubble ) {
			// Piggyback on a donor event to simulate a different one.
			// Fake originalEvent to avoid donor's stopPropagation, but if the
			// simulated event prevents default then we do the same on the donor.
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{ type: type,
					isSimulated: true,
					originalEvent: {}
				}
			);
			if ( bubble ) {
				jQuery.event.trigger( e, null, elem );
			} else {
				jQuery.event.dispatch.call( elem, e );
			}
			if ( e.isDefaultPrevented() ) {
				event.preventDefault();
			}
		}
	};
	
	// Some plugins are using, but it's undocumented/deprecated and will be removed.
	// The 1.7 special event interface should provide all the hooks needed now.
	jQuery.event.handle = jQuery.event.dispatch;
	
	jQuery.removeEvent = document.removeEventListener ?
		function( elem, type, handle ) {
			if ( elem.removeEventListener ) {
				elem.removeEventListener( type, handle, false );
			}
		} :
		function( elem, type, handle ) {
			if ( elem.detachEvent ) {
				elem.detachEvent( "on" + type, handle );
			}
		};
	
	jQuery.Event = function( src, props ) {
		// Allow instantiation without the 'new' keyword
		if ( !(this instanceof jQuery.Event) ) {
			return new jQuery.Event( src, props );
		}
	
		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;
	
			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
				src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;
	
		// Event type
		} else {
			this.type = src;
		}
	
		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}
	
		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();
	
		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};
	
	function returnFalse() {
		return false;
	}
	function returnTrue() {
		return true;
	}
	
	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		preventDefault: function() {
			this.isDefaultPrevented = returnTrue;
	
			var e = this.originalEvent;
			if ( !e ) {
				return;
			}
	
			// if preventDefault exists run it on the original event
			if ( e.preventDefault ) {
				e.preventDefault();
	
			// otherwise set the returnValue property of the original event to false (IE)
			} else {
				e.returnValue = false;
			}
		},
		stopPropagation: function() {
			this.isPropagationStopped = returnTrue;
	
			var e = this.originalEvent;
			if ( !e ) {
				return;
			}
			// if stopPropagation exists run it on the original event
			if ( e.stopPropagation ) {
				e.stopPropagation();
			}
			// otherwise set the cancelBubble property of the original event to true (IE)
			e.cancelBubble = true;
		},
		stopImmediatePropagation: function() {
			this.isImmediatePropagationStopped = returnTrue;
			this.stopPropagation();
		},
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse
	};
	
	// Create mouseenter/leave events using mouseover/out and event-time checks
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,
	
			handle: function( event ) {
				var target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj,
					selector = handleObj.selector,
					ret;
	
				// For mousenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	});
	
	// IE submit delegation
	if ( !jQuery.support.submitBubbles ) {
	
		jQuery.event.special.submit = {
			setup: function() {
				// Only need this for delegated form submit events
				if ( jQuery.nodeName( this, "form" ) ) {
					return false;
				}
	
				// Lazy-add a submit handler when a descendant form may potentially be submitted
				jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
					// Node name check avoids a VML-related crash in IE (#9807)
					var elem = e.target,
						form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
					if ( form && !form._submit_attached ) {
						jQuery.event.add( form, "submit._submit", function( event ) {
							event._submit_bubble = true;
						});
						form._submit_attached = true;
					}
				});
				// return undefined since we don't need an event listener
			},
			
			postDispatch: function( event ) {
				// If form was submitted by the user, bubble the event up the tree
				if ( event._submit_bubble ) {
					delete event._submit_bubble;
					if ( this.parentNode && !event.isTrigger ) {
						jQuery.event.simulate( "submit", this.parentNode, event, true );
					}
				}
			},
	
			teardown: function() {
				// Only need this for delegated form submit events
				if ( jQuery.nodeName( this, "form" ) ) {
					return false;
				}
	
				// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
				jQuery.event.remove( this, "._submit" );
			}
		};
	}
	
	// IE change delegation and checkbox/radio fix
	if ( !jQuery.support.changeBubbles ) {
	
		jQuery.event.special.change = {
	
			setup: function() {
	
				if ( rformElems.test( this.nodeName ) ) {
					// IE doesn't fire change on a check/radio until blur; trigger it on click
					// after a propertychange. Eat the blur-change in special.change.handle.
					// This still fires onchange a second time for check/radio after blur.
					if ( this.type === "checkbox" || this.type === "radio" ) {
						jQuery.event.add( this, "propertychange._change", function( event ) {
							if ( event.originalEvent.propertyName === "checked" ) {
								this._just_changed = true;
							}
						});
						jQuery.event.add( this, "click._change", function( event ) {
							if ( this._just_changed && !event.isTrigger ) {
								this._just_changed = false;
								jQuery.event.simulate( "change", this, event, true );
							}
						});
					}
					return false;
				}
				// Delegated event; lazy-add a change handler on descendant inputs
				jQuery.event.add( this, "beforeactivate._change", function( e ) {
					var elem = e.target;
	
					if ( rformElems.test( elem.nodeName ) && !elem._change_attached ) {
						jQuery.event.add( elem, "change._change", function( event ) {
							if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
								jQuery.event.simulate( "change", this.parentNode, event, true );
							}
						});
						elem._change_attached = true;
					}
				});
			},
	
			handle: function( event ) {
				var elem = event.target;
	
				// Swallow native change events from checkbox/radio, we already triggered them above
				if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
					return event.handleObj.handler.apply( this, arguments );
				}
			},
	
			teardown: function() {
				jQuery.event.remove( this, "._change" );
	
				return rformElems.test( this.nodeName );
			}
		};
	}
	
	// Create "bubbling" focus and blur events
	if ( !jQuery.support.focusinBubbles ) {
		jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {
	
			// Attach a single capturing handler while someone wants focusin/focusout
			var attaches = 0,
				handler = function( event ) {
					jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
				};
	
			jQuery.event.special[ fix ] = {
				setup: function() {
					if ( attaches++ === 0 ) {
						document.addEventListener( orig, handler, true );
					}
				},
				teardown: function() {
					if ( --attaches === 0 ) {
						document.removeEventListener( orig, handler, true );
					}
				}
			};
		});
	}
	
	jQuery.fn.extend({
	
		on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
			var origFn, type;
	
			// Types can be a map of types/handlers
			if ( typeof types === "object" ) {
				// ( types-Object, selector, data )
				if ( typeof selector !== "string" ) { // && selector != null
					// ( types-Object, data )
					data = data || selector;
					selector = undefined;
				}
				for ( type in types ) {
					this.on( type, selector, data, types[ type ], one );
				}
				return this;
			}
	
			if ( data == null && fn == null ) {
				// ( types, fn )
				fn = selector;
				data = selector = undefined;
			} else if ( fn == null ) {
				if ( typeof selector === "string" ) {
					// ( types, selector, fn )
					fn = data;
					data = undefined;
				} else {
					// ( types, data, fn )
					fn = data;
					data = selector;
					selector = undefined;
				}
			}
			if ( fn === false ) {
				fn = returnFalse;
			} else if ( !fn ) {
				return this;
			}
	
			if ( one === 1 ) {
				origFn = fn;
				fn = function( event ) {
					// Can use an empty set, since event contains the info
					jQuery().off( event );
					return origFn.apply( this, arguments );
				};
				// Use same guid so caller can remove using origFn
				fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
			}
			return this.each( function() {
				jQuery.event.add( this, types, fn, data, selector );
			});
		},
		one: function( types, selector, data, fn ) {
			return this.on( types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			if ( types && types.preventDefault && types.handleObj ) {
				// ( event )  dispatched jQuery.Event
				var handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {
				// ( types-object [, selector] )
				for ( var type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {
				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each(function() {
				jQuery.event.remove( this, types, fn, selector );
			});
		},
	
		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},
	
		live: function( types, data, fn ) {
			jQuery( this.context ).on( types, this.selector, data, fn );
			return this;
		},
		die: function( types, fn ) {
			jQuery( this.context ).off( types, this.selector || "**", fn );
			return this;
		},
	
		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {
			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length == 1? this.off( selector, "**" ) : this.off( types, selector, fn );
		},
	
		trigger: function( type, data ) {
			return this.each(function() {
				jQuery.event.trigger( type, data, this );
			});
		},
		triggerHandler: function( type, data ) {
			if ( this[0] ) {
				return jQuery.event.trigger( type, data, this[0], true );
			}
		},
	
		toggle: function( fn ) {
			// Save reference to arguments for access in closure
			var args = arguments,
				guid = fn.guid || jQuery.guid++,
				i = 0,
				toggler = function( event ) {
					// Figure out which function to execute
					var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
					jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );
	
					// Make sure that clicks stop
					event.preventDefault();
	
					// and execute the function
					return args[ lastToggle ].apply( this, arguments ) || false;
				};
	
			// link all the functions, so any of them can unbind this click handler
			toggler.guid = guid;
			while ( i < args.length ) {
				args[ i++ ].guid = guid;
			}
	
			return this.click( toggler );
		},
	
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	});
	
	jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {
	
		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			if ( fn == null ) {
				fn = data;
				data = null;
			}
	
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	
		if ( jQuery.attrFn ) {
			jQuery.attrFn[ name ] = true;
		}
	
		if ( rkeyEvent.test( name ) ) {
			jQuery.event.fixHooks[ name ] = jQuery.event.keyHooks;
		}
	
		if ( rmouseEvent.test( name ) ) {
			jQuery.event.fixHooks[ name ] = jQuery.event.mouseHooks;
		}
	});
	
	
	
	/*!
	 * Sizzle CSS Selector Engine
	 *  Copyright 2011, The Dojo Foundation
	 *  Released under the MIT, BSD, and GPL Licenses.
	 *  More information: http://sizzlejs.com/
	 */
	(function(){
	
	var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
		expando = "sizcache" + (Math.random() + '').replace('.', ''),
		done = 0,
		toString = Object.prototype.toString,
		hasDuplicate = false,
		baseHasDuplicate = true,
		rBackslash = /\\/g,
		rReturn = /\r\n/g,
		rNonWord = /\W/;
	
	// Here we check if the JavaScript engine is using some sort of
	// optimization where it does not always call our comparision
	// function. If that is the case, discard the hasDuplicate value.
	//   Thus far that includes Google Chrome.
	[0, 0].sort(function() {
		baseHasDuplicate = false;
		return 0;
	});
	
	var Sizzle = function( selector, context, results, seed ) {
		results = results || [];
		context = context || document;
	
		var origContext = context;
	
		if ( context.nodeType !== 1 && context.nodeType !== 9 ) {
			return [];
		}
	
		if ( !selector || typeof selector !== "string" ) {
			return results;
		}
	
		var m, set, checkSet, extra, ret, cur, pop, i,
			prune = true,
			contextXML = Sizzle.isXML( context ),
			parts = [],
			soFar = selector;
	
		// Reset the position of the chunker regexp (start from head)
		do {
			chunker.exec( "" );
			m = chunker.exec( soFar );
	
			if ( m ) {
				soFar = m[3];
	
				parts.push( m[1] );
	
				if ( m[2] ) {
					extra = m[3];
					break;
				}
			}
		} while ( m );
	
		if ( parts.length > 1 && origPOS.exec( selector ) ) {
	
			if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
				set = posProcess( parts[0] + parts[1], context, seed );
	
			} else {
				set = Expr.relative[ parts[0] ] ?
					[ context ] :
					Sizzle( parts.shift(), context );
	
				while ( parts.length ) {
					selector = parts.shift();
	
					if ( Expr.relative[ selector ] ) {
						selector += parts.shift();
					}
	
					set = posProcess( selector, set, seed );
				}
			}
	
		} else {
			// Take a shortcut and set the context if the root selector is an ID
			// (but not if it'll be faster if the inner selector is an ID)
			if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
					Expr.match.ID.test(parts[0]) && !Expr.match.ID.test(parts[parts.length - 1]) ) {
	
				ret = Sizzle.find( parts.shift(), context, contextXML );
				context = ret.expr ?
					Sizzle.filter( ret.expr, ret.set )[0] :
					ret.set[0];
			}
	
			if ( context ) {
				ret = seed ?
					{ expr: parts.pop(), set: makeArray(seed) } :
					Sizzle.find( parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML );
	
				set = ret.expr ?
					Sizzle.filter( ret.expr, ret.set ) :
					ret.set;
	
				if ( parts.length > 0 ) {
					checkSet = makeArray( set );
	
				} else {
					prune = false;
				}
	
				while ( parts.length ) {
					cur = parts.pop();
					pop = cur;
	
					if ( !Expr.relative[ cur ] ) {
						cur = "";
					} else {
						pop = parts.pop();
					}
	
					if ( pop == null ) {
						pop = context;
					}
	
					Expr.relative[ cur ]( checkSet, pop, contextXML );
				}
	
			} else {
				checkSet = parts = [];
			}
		}
	
		if ( !checkSet ) {
			checkSet = set;
		}
	
		if ( !checkSet ) {
			Sizzle.error( cur || selector );
		}
	
		if ( toString.call(checkSet) === "[object Array]" ) {
			if ( !prune ) {
				results.push.apply( results, checkSet );
	
			} else if ( context && context.nodeType === 1 ) {
				for ( i = 0; checkSet[i] != null; i++ ) {
					if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i])) ) {
						results.push( set[i] );
					}
				}
	
			} else {
				for ( i = 0; checkSet[i] != null; i++ ) {
					if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
						results.push( set[i] );
					}
				}
			}
	
		} else {
			makeArray( checkSet, results );
		}
	
		if ( extra ) {
			Sizzle( extra, origContext, results, seed );
			Sizzle.uniqueSort( results );
		}
	
		return results;
	};
	
	Sizzle.uniqueSort = function( results ) {
		if ( sortOrder ) {
			hasDuplicate = baseHasDuplicate;
			results.sort( sortOrder );
	
			if ( hasDuplicate ) {
				for ( var i = 1; i < results.length; i++ ) {
					if ( results[i] === results[ i - 1 ] ) {
						results.splice( i--, 1 );
					}
				}
			}
		}
	
		return results;
	};
	
	Sizzle.matches = function( expr, set ) {
		return Sizzle( expr, null, null, set );
	};
	
	Sizzle.matchesSelector = function( node, expr ) {
		return Sizzle( expr, null, null, [node] ).length > 0;
	};
	
	Sizzle.find = function( expr, context, isXML ) {
		var set, i, len, match, type, left;
	
		if ( !expr ) {
			return [];
		}
	
		for ( i = 0, len = Expr.order.length; i < len; i++ ) {
			type = Expr.order[i];
	
			if ( (match = Expr.leftMatch[ type ].exec( expr )) ) {
				left = match[1];
				match.splice( 1, 1 );
	
				if ( left.substr( left.length - 1 ) !== "\\" ) {
					match[1] = (match[1] || "").replace( rBackslash, "" );
					set = Expr.find[ type ]( match, context, isXML );
	
					if ( set != null ) {
						expr = expr.replace( Expr.match[ type ], "" );
						break;
					}
				}
			}
		}
	
		if ( !set ) {
			set = typeof context.getElementsByTagName !== "undefined" ?
				context.getElementsByTagName( "*" ) :
				[];
		}
	
		return { set: set, expr: expr };
	};
	
	Sizzle.filter = function( expr, set, inplace, not ) {
		var match, anyFound,
			type, found, item, filter, left,
			i, pass,
			old = expr,
			result = [],
			curLoop = set,
			isXMLFilter = set && set[0] && Sizzle.isXML( set[0] );
	
		while ( expr && set.length ) {
			for ( type in Expr.filter ) {
				if ( (match = Expr.leftMatch[ type ].exec( expr )) != null && match[2] ) {
					filter = Expr.filter[ type ];
					left = match[1];
	
					anyFound = false;
	
					match.splice(1,1);
	
					if ( left.substr( left.length - 1 ) === "\\" ) {
						continue;
					}
	
					if ( curLoop === result ) {
						result = [];
					}
	
					if ( Expr.preFilter[ type ] ) {
						match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );
	
						if ( !match ) {
							anyFound = found = true;
	
						} else if ( match === true ) {
							continue;
						}
					}
	
					if ( match ) {
						for ( i = 0; (item = curLoop[i]) != null; i++ ) {
							if ( item ) {
								found = filter( item, match, i, curLoop );
								pass = not ^ found;
	
								if ( inplace && found != null ) {
									if ( pass ) {
										anyFound = true;
	
									} else {
										curLoop[i] = false;
									}
	
								} else if ( pass ) {
									result.push( item );
									anyFound = true;
								}
							}
						}
					}
	
					if ( found !== undefined ) {
						if ( !inplace ) {
							curLoop = result;
						}
	
						expr = expr.replace( Expr.match[ type ], "" );
	
						if ( !anyFound ) {
							return [];
						}
	
						break;
					}
				}
			}
	
			// Improper expression
			if ( expr === old ) {
				if ( anyFound == null ) {
					Sizzle.error( expr );
	
				} else {
					break;
				}
			}
	
			old = expr;
		}
	
		return curLoop;
	};
	
	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};
	
	/**
	 * Utility function for retreiving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	var getText = Sizzle.getText = function( elem ) {
	    var i, node,
			nodeType = elem.nodeType,
			ret = "";
	
		if ( nodeType ) {
			if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
				// Use textContent || innerText for elements
				if ( typeof elem.textContent === 'string' ) {
					return elem.textContent;
				} else if ( typeof elem.innerText === 'string' ) {
					// Replace IE's carriage returns
					return elem.innerText.replace( rReturn, '' );
				} else {
					// Traverse it's children
					for ( elem = elem.firstChild; elem; elem = elem.nextSibling) {
						ret += getText( elem );
					}
				}
			} else if ( nodeType === 3 || nodeType === 4 ) {
				return elem.nodeValue;
			}
		} else {
	
			// If no nodeType, this is expected to be an array
			for ( i = 0; (node = elem[i]); i++ ) {
				// Do not traverse comment nodes
				if ( node.nodeType !== 8 ) {
					ret += getText( node );
				}
			}
		}
		return ret;
	};
	
	var Expr = Sizzle.selectors = {
		order: [ "ID", "NAME", "TAG" ],
	
		match: {
			ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
			CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
			NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
			ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
			TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
			CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
			POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
			PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
		},
	
		leftMatch: {},
	
		attrMap: {
			"class": "className",
			"for": "htmlFor"
		},
	
		attrHandle: {
			href: function( elem ) {
				return elem.getAttribute( "href" );
			},
			type: function( elem ) {
				return elem.getAttribute( "type" );
			}
		},
	
		relative: {
			"+": function(checkSet, part){
				var isPartStr = typeof part === "string",
					isTag = isPartStr && !rNonWord.test( part ),
					isPartStrNotTag = isPartStr && !isTag;
	
				if ( isTag ) {
					part = part.toLowerCase();
				}
	
				for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
					if ( (elem = checkSet[i]) ) {
						while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}
	
						checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
							elem || false :
							elem === part;
					}
				}
	
				if ( isPartStrNotTag ) {
					Sizzle.filter( part, checkSet, true );
				}
			},
	
			">": function( checkSet, part ) {
				var elem,
					isPartStr = typeof part === "string",
					i = 0,
					l = checkSet.length;
	
				if ( isPartStr && !rNonWord.test( part ) ) {
					part = part.toLowerCase();
	
					for ( ; i < l; i++ ) {
						elem = checkSet[i];
	
						if ( elem ) {
							var parent = elem.parentNode;
							checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
						}
					}
	
				} else {
					for ( ; i < l; i++ ) {
						elem = checkSet[i];
	
						if ( elem ) {
							checkSet[i] = isPartStr ?
								elem.parentNode :
								elem.parentNode === part;
						}
					}
	
					if ( isPartStr ) {
						Sizzle.filter( part, checkSet, true );
					}
				}
			},
	
			"": function(checkSet, part, isXML){
				var nodeCheck,
					doneName = done++,
					checkFn = dirCheck;
	
				if ( typeof part === "string" && !rNonWord.test( part ) ) {
					part = part.toLowerCase();
					nodeCheck = part;
					checkFn = dirNodeCheck;
				}
	
				checkFn( "parentNode", part, doneName, checkSet, nodeCheck, isXML );
			},
	
			"~": function( checkSet, part, isXML ) {
				var nodeCheck,
					doneName = done++,
					checkFn = dirCheck;
	
				if ( typeof part === "string" && !rNonWord.test( part ) ) {
					part = part.toLowerCase();
					nodeCheck = part;
					checkFn = dirNodeCheck;
				}
	
				checkFn( "previousSibling", part, doneName, checkSet, nodeCheck, isXML );
			}
		},
	
		find: {
			ID: function( match, context, isXML ) {
				if ( typeof context.getElementById !== "undefined" && !isXML ) {
					var m = context.getElementById(match[1]);
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					return m && m.parentNode ? [m] : [];
				}
			},
	
			NAME: function( match, context ) {
				if ( typeof context.getElementsByName !== "undefined" ) {
					var ret = [],
						results = context.getElementsByName( match[1] );
	
					for ( var i = 0, l = results.length; i < l; i++ ) {
						if ( results[i].getAttribute("name") === match[1] ) {
							ret.push( results[i] );
						}
					}
	
					return ret.length === 0 ? null : ret;
				}
			},
	
			TAG: function( match, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( match[1] );
				}
			}
		},
		preFilter: {
			CLASS: function( match, curLoop, inplace, result, not, isXML ) {
				match = " " + match[1].replace( rBackslash, "" ) + " ";
	
				if ( isXML ) {
					return match;
				}
	
				for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
					if ( elem ) {
						if ( not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n\r]/g, " ").indexOf(match) >= 0) ) {
							if ( !inplace ) {
								result.push( elem );
							}
	
						} else if ( inplace ) {
							curLoop[i] = false;
						}
					}
				}
	
				return false;
			},
	
			ID: function( match ) {
				return match[1].replace( rBackslash, "" );
			},
	
			TAG: function( match, curLoop ) {
				return match[1].replace( rBackslash, "" ).toLowerCase();
			},
	
			CHILD: function( match ) {
				if ( match[1] === "nth" ) {
					if ( !match[2] ) {
						Sizzle.error( match[0] );
					}
	
					match[2] = match[2].replace(/^\+|\s*/g, '');
	
					// parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
					var test = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(
						match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
						!/\D/.test( match[2] ) && "0n+" + match[2] || match[2]);
	
					// calculate the numbers (first)n+(last) including if they are negative
					match[2] = (test[1] + (test[2] || 1)) - 0;
					match[3] = test[3] - 0;
				}
				else if ( match[2] ) {
					Sizzle.error( match[0] );
				}
	
				// TODO: Move to normal caching system
				match[0] = done++;
	
				return match;
			},
	
			ATTR: function( match, curLoop, inplace, result, not, isXML ) {
				var name = match[1] = match[1].replace( rBackslash, "" );
	
				if ( !isXML && Expr.attrMap[name] ) {
					match[1] = Expr.attrMap[name];
				}
	
				// Handle if an un-quoted value was used
				match[4] = ( match[4] || match[5] || "" ).replace( rBackslash, "" );
	
				if ( match[2] === "~=" ) {
					match[4] = " " + match[4] + " ";
				}
	
				return match;
			},
	
			PSEUDO: function( match, curLoop, inplace, result, not ) {
				if ( match[1] === "not" ) {
					// If we're dealing with a complex expression, or a simple one
					if ( ( chunker.exec(match[3]) || "" ).length > 1 || /^\w/.test(match[3]) ) {
						match[3] = Sizzle(match[3], null, null, curLoop);
	
					} else {
						var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
	
						if ( !inplace ) {
							result.push.apply( result, ret );
						}
	
						return false;
					}
	
				} else if ( Expr.match.POS.test( match[0] ) || Expr.match.CHILD.test( match[0] ) ) {
					return true;
				}
	
				return match;
			},
	
			POS: function( match ) {
				match.unshift( true );
	
				return match;
			}
		},
	
		filters: {
			enabled: function( elem ) {
				return elem.disabled === false && elem.type !== "hidden";
			},
	
			disabled: function( elem ) {
				return elem.disabled === true;
			},
	
			checked: function( elem ) {
				return elem.checked === true;
			},
	
			selected: function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}
	
				return elem.selected === true;
			},
	
			parent: function( elem ) {
				return !!elem.firstChild;
			},
	
			empty: function( elem ) {
				return !elem.firstChild;
			},
	
			has: function( elem, i, match ) {
				return !!Sizzle( match[3], elem ).length;
			},
	
			header: function( elem ) {
				return (/h\d/i).test( elem.nodeName );
			},
	
			text: function( elem ) {
				var attr = elem.getAttribute( "type" ), type = elem.type;
				// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
				// use getAttribute instead to test this case
				return elem.nodeName.toLowerCase() === "input" && "text" === type && ( attr === type || attr === null );
			},
	
			radio: function( elem ) {
				return elem.nodeName.toLowerCase() === "input" && "radio" === elem.type;
			},
	
			checkbox: function( elem ) {
				return elem.nodeName.toLowerCase() === "input" && "checkbox" === elem.type;
			},
	
			file: function( elem ) {
				return elem.nodeName.toLowerCase() === "input" && "file" === elem.type;
			},
	
			password: function( elem ) {
				return elem.nodeName.toLowerCase() === "input" && "password" === elem.type;
			},
	
			submit: function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return (name === "input" || name === "button") && "submit" === elem.type;
			},
	
			image: function( elem ) {
				return elem.nodeName.toLowerCase() === "input" && "image" === elem.type;
			},
	
			reset: function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return (name === "input" || name === "button") && "reset" === elem.type;
			},
	
			button: function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && "button" === elem.type || name === "button";
			},
	
			input: function( elem ) {
				return (/input|select|textarea|button/i).test( elem.nodeName );
			},
	
			focus: function( elem ) {
				return elem === elem.ownerDocument.activeElement;
			}
		},
		setFilters: {
			first: function( elem, i ) {
				return i === 0;
			},
	
			last: function( elem, i, match, array ) {
				return i === array.length - 1;
			},
	
			even: function( elem, i ) {
				return i % 2 === 0;
			},
	
			odd: function( elem, i ) {
				return i % 2 === 1;
			},
	
			lt: function( elem, i, match ) {
				return i < match[3] - 0;
			},
	
			gt: function( elem, i, match ) {
				return i > match[3] - 0;
			},
	
			nth: function( elem, i, match ) {
				return match[3] - 0 === i;
			},
	
			eq: function( elem, i, match ) {
				return match[3] - 0 === i;
			}
		},
		filter: {
			PSEUDO: function( elem, match, i, array ) {
				var name = match[1],
					filter = Expr.filters[ name ];
	
				if ( filter ) {
					return filter( elem, i, match, array );
	
				} else if ( name === "contains" ) {
					return (elem.textContent || elem.innerText || getText([ elem ]) || "").indexOf(match[3]) >= 0;
	
				} else if ( name === "not" ) {
					var not = match[3];
	
					for ( var j = 0, l = not.length; j < l; j++ ) {
						if ( not[j] === elem ) {
							return false;
						}
					}
	
					return true;
	
				} else {
					Sizzle.error( name );
				}
			},
	
			CHILD: function( elem, match ) {
				var first, last,
					doneName, parent, cache,
					count, diff,
					type = match[1],
					node = elem;
	
				switch ( type ) {
					case "only":
					case "first":
						while ( (node = node.previousSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}
	
						if ( type === "first" ) {
							return true;
						}
	
						node = elem;
	
						/* falls through */
					case "last":
						while ( (node = node.nextSibling) ) {
							if ( node.nodeType === 1 ) {
								return false;
							}
						}
	
						return true;
	
					case "nth":
						first = match[2];
						last = match[3];
	
						if ( first === 1 && last === 0 ) {
							return true;
						}
	
						doneName = match[0];
						parent = elem.parentNode;
	
						if ( parent && (parent[ expando ] !== doneName || !elem.nodeIndex) ) {
							count = 0;
	
							for ( node = parent.firstChild; node; node = node.nextSibling ) {
								if ( node.nodeType === 1 ) {
									node.nodeIndex = ++count;
								}
							}
	
							parent[ expando ] = doneName;
						}
	
						diff = elem.nodeIndex - last;
	
						if ( first === 0 ) {
							return diff === 0;
	
						} else {
							return ( diff % first === 0 && diff / first >= 0 );
						}
				}
			},
	
			ID: function( elem, match ) {
				return elem.nodeType === 1 && elem.getAttribute("id") === match;
			},
	
			TAG: function( elem, match ) {
				return (match === "*" && elem.nodeType === 1) || !!elem.nodeName && elem.nodeName.toLowerCase() === match;
			},
	
			CLASS: function( elem, match ) {
				return (" " + (elem.className || elem.getAttribute("class")) + " ")
					.indexOf( match ) > -1;
			},
	
			ATTR: function( elem, match ) {
				var name = match[1],
					result = Sizzle.attr ?
						Sizzle.attr( elem, name ) :
						Expr.attrHandle[ name ] ?
						Expr.attrHandle[ name ]( elem ) :
						elem[ name ] != null ?
							elem[ name ] :
							elem.getAttribute( name ),
					value = result + "",
					type = match[2],
					check = match[4];
	
				return result == null ?
					type === "!=" :
					!type && Sizzle.attr ?
					result != null :
					type === "=" ?
					value === check :
					type === "*=" ?
					value.indexOf(check) >= 0 :
					type === "~=" ?
					(" " + value + " ").indexOf(check) >= 0 :
					!check ?
					value && result !== false :
					type === "!=" ?
					value !== check :
					type === "^=" ?
					value.indexOf(check) === 0 :
					type === "$=" ?
					value.substr(value.length - check.length) === check :
					type === "|=" ?
					value === check || value.substr(0, check.length + 1) === check + "-" :
					false;
			},
	
			POS: function( elem, match, i, array ) {
				var name = match[2],
					filter = Expr.setFilters[ name ];
	
				if ( filter ) {
					return filter( elem, i, match, array );
				}
			}
		}
	};
	
	var origPOS = Expr.match.POS,
		fescape = function(all, num){
			return "\\" + (num - 0 + 1);
		};
	
	for ( var type in Expr.match ) {
		Expr.match[ type ] = new RegExp( Expr.match[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
		Expr.leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + Expr.match[ type ].source.replace(/\\(\d+)/g, fescape) );
	}
	// Expose origPOS
	// "global" as in regardless of relation to brackets/parens
	Expr.match.globalPOS = origPOS;
	
	var makeArray = function( array, results ) {
		array = Array.prototype.slice.call( array, 0 );
	
		if ( results ) {
			results.push.apply( results, array );
			return results;
		}
	
		return array;
	};
	
	// Perform a simple check to determine if the browser is capable of
	// converting a NodeList to an array using builtin methods.
	// Also verifies that the returned array holds DOM nodes
	// (which is not the case in the Blackberry browser)
	try {
		Array.prototype.slice.call( document.documentElement.childNodes, 0 )[0].nodeType;
	
	// Provide a fallback method if it does not work
	} catch( e ) {
		makeArray = function( array, results ) {
			var i = 0,
				ret = results || [];
	
			if ( toString.call(array) === "[object Array]" ) {
				Array.prototype.push.apply( ret, array );
	
			} else {
				if ( typeof array.length === "number" ) {
					for ( var l = array.length; i < l; i++ ) {
						ret.push( array[i] );
					}
	
				} else {
					for ( ; array[i]; i++ ) {
						ret.push( array[i] );
					}
				}
			}
	
			return ret;
		};
	}
	
	var sortOrder, siblingCheck;
	
	if ( document.documentElement.compareDocumentPosition ) {
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
	
			if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
				return a.compareDocumentPosition ? -1 : 1;
			}
	
			return a.compareDocumentPosition(b) & 4 ? -1 : 1;
		};
	
	} else {
		sortOrder = function( a, b ) {
			// The nodes are identical, we can exit early
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
	
			// Fallback to using sourceIndex (in IE) if it's available on both nodes
			} else if ( a.sourceIndex && b.sourceIndex ) {
				return a.sourceIndex - b.sourceIndex;
			}
	
			var al, bl,
				ap = [],
				bp = [],
				aup = a.parentNode,
				bup = b.parentNode,
				cur = aup;
	
			// If the nodes are siblings (or identical) we can do a quick check
			if ( aup === bup ) {
				return siblingCheck( a, b );
	
			// If no parents were found then the nodes are disconnected
			} else if ( !aup ) {
				return -1;
	
			} else if ( !bup ) {
				return 1;
			}
	
			// Otherwise they're somewhere else in the tree so we need
			// to build up a full list of the parentNodes for comparison
			while ( cur ) {
				ap.unshift( cur );
				cur = cur.parentNode;
			}
	
			cur = bup;
	
			while ( cur ) {
				bp.unshift( cur );
				cur = cur.parentNode;
			}
	
			al = ap.length;
			bl = bp.length;
	
			// Start walking down the tree looking for a discrepancy
			for ( var i = 0; i < al && i < bl; i++ ) {
				if ( ap[i] !== bp[i] ) {
					return siblingCheck( ap[i], bp[i] );
				}
			}
	
			// We ended someplace up the tree so do a sibling check
			return i === al ?
				siblingCheck( a, bp[i], -1 ) :
				siblingCheck( ap[i], b, 1 );
		};
	
		siblingCheck = function( a, b, ret ) {
			if ( a === b ) {
				return ret;
			}
	
			var cur = a.nextSibling;
	
			while ( cur ) {
				if ( cur === b ) {
					return -1;
				}
	
				cur = cur.nextSibling;
			}
	
			return 1;
		};
	}
	
	// Check to see if the browser returns elements by name when
	// querying by getElementById (and provide a workaround)
	(function(){
		// We're going to inject a fake input element with a specified name
		var form = document.createElement("div"),
			id = "script" + (new Date()).getTime(),
			root = document.documentElement;
	
		form.innerHTML = "<a name='" + id + "'/>";
	
		// Inject it into the root element, check its status, and remove it quickly
		root.insertBefore( form, root.firstChild );
	
		// The workaround has to do additional checks after a getElementById
		// Which slows things down for other browsers (hence the branching)
		if ( document.getElementById( id ) ) {
			Expr.find.ID = function( match, context, isXML ) {
				if ( typeof context.getElementById !== "undefined" && !isXML ) {
					var m = context.getElementById(match[1]);
	
					return m ?
						m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ?
							[m] :
							undefined :
						[];
				}
			};
	
			Expr.filter.ID = function( elem, match ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
	
				return elem.nodeType === 1 && node && node.nodeValue === match;
			};
		}
	
		root.removeChild( form );
	
		// release memory in IE
		root = form = null;
	})();
	
	(function(){
		// Check to see if the browser returns only elements
		// when doing getElementsByTagName("*")
	
		// Create a fake element
		var div = document.createElement("div");
		div.appendChild( document.createComment("") );
	
		// Make sure no comments are found
		if ( div.getElementsByTagName("*").length > 0 ) {
			Expr.find.TAG = function( match, context ) {
				var results = context.getElementsByTagName( match[1] );
	
				// Filter out possible comments
				if ( match[1] === "*" ) {
					var tmp = [];
	
					for ( var i = 0; results[i]; i++ ) {
						if ( results[i].nodeType === 1 ) {
							tmp.push( results[i] );
						}
					}
	
					results = tmp;
				}
	
				return results;
			};
		}
	
		// Check to see if an attribute returns normalized href attributes
		div.innerHTML = "<a href='#'></a>";
	
		if ( div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
				div.firstChild.getAttribute("href") !== "#" ) {
	
			Expr.attrHandle.href = function( elem ) {
				return elem.getAttribute( "href", 2 );
			};
		}
	
		// release memory in IE
		div = null;
	})();
	
	if ( document.querySelectorAll ) {
		(function(){
			var oldSizzle = Sizzle,
				div = document.createElement("div"),
				id = "__sizzle__";
	
			div.innerHTML = "<p class='TEST'></p>";
	
			// Safari can't handle uppercase or unicode characters when
			// in quirks mode.
			if ( div.querySelectorAll && div.querySelectorAll(".TEST").length === 0 ) {
				return;
			}
	
			Sizzle = function( query, context, extra, seed ) {
				context = context || document;
	
				// Only use querySelectorAll on non-XML documents
				// (ID selectors don't work in non-HTML documents)
				if ( !seed && !Sizzle.isXML(context) ) {
					// See if we find a selector to speed up
					var match = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec( query );
	
					if ( match && (context.nodeType === 1 || context.nodeType === 9) ) {
						// Speed-up: Sizzle("TAG")
						if ( match[1] ) {
							return makeArray( context.getElementsByTagName( query ), extra );
	
						// Speed-up: Sizzle(".CLASS")
						} else if ( match[2] && Expr.find.CLASS && context.getElementsByClassName ) {
							return makeArray( context.getElementsByClassName( match[2] ), extra );
						}
					}
	
					if ( context.nodeType === 9 ) {
						// Speed-up: Sizzle("body")
						// The body element only exists once, optimize finding it
						if ( query === "body" && context.body ) {
							return makeArray( [ context.body ], extra );
	
						// Speed-up: Sizzle("#ID")
						} else if ( match && match[3] ) {
							var elem = context.getElementById( match[3] );
	
							// Check parentNode to catch when Blackberry 4.6 returns
							// nodes that are no longer in the document #6963
							if ( elem && elem.parentNode ) {
								// Handle the case where IE and Opera return items
								// by name instead of ID
								if ( elem.id === match[3] ) {
									return makeArray( [ elem ], extra );
								}
	
							} else {
								return makeArray( [], extra );
							}
						}
	
						try {
							return makeArray( context.querySelectorAll(query), extra );
						} catch(qsaError) {}
	
					// qSA works strangely on Element-rooted queries
					// We can work around this by specifying an extra ID on the root
					// and working up from there (Thanks to Andrew Dupont for the technique)
					// IE 8 doesn't work on object elements
					} else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
						var oldContext = context,
							old = context.getAttribute( "id" ),
							nid = old || id,
							hasParent = context.parentNode,
							relativeHierarchySelector = /^\s*[+~]/.test( query );
	
						if ( !old ) {
							context.setAttribute( "id", nid );
						} else {
							nid = nid.replace( /'/g, "\\$&" );
						}
						if ( relativeHierarchySelector && hasParent ) {
							context = context.parentNode;
						}
	
						try {
							if ( !relativeHierarchySelector || hasParent ) {
								return makeArray( context.querySelectorAll( "[id='" + nid + "'] " + query ), extra );
							}
	
						} catch(pseudoError) {
						} finally {
							if ( !old ) {
								oldContext.removeAttribute( "id" );
							}
						}
					}
				}
	
				return oldSizzle(query, context, extra, seed);
			};
	
			for ( var prop in oldSizzle ) {
				Sizzle[ prop ] = oldSizzle[ prop ];
			}
	
			// release memory in IE
			div = null;
		})();
	}
	
	(function(){
		var html = document.documentElement,
			matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;
	
		if ( matches ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9 fails this)
			var disconnectedMatch = !matches.call( document.createElement( "div" ), "div" ),
				pseudoWorks = false;
	
			try {
				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( document.documentElement, "[test!='']:sizzle" );
	
			} catch( pseudoError ) {
				pseudoWorks = true;
			}
	
			Sizzle.matchesSelector = function( node, expr ) {
				// Make sure that attribute selectors are quoted
				expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
	
				if ( !Sizzle.isXML( node ) ) {
					try {
						if ( pseudoWorks || !Expr.match.PSEUDO.test( expr ) && !/!=/.test( expr ) ) {
							var ret = matches.call( node, expr );
	
							// IE 9's matchesSelector returns false on disconnected nodes
							if ( ret || !disconnectedMatch ||
									// As well, disconnected nodes are said to be in a document
									// fragment in IE 9, so check for that
									node.document && node.document.nodeType !== 11 ) {
								return ret;
							}
						}
					} catch(e) {}
				}
	
				return Sizzle(expr, null, null, [node]).length > 0;
			};
		}
	})();
	
	(function(){
		var div = document.createElement("div");
	
		div.innerHTML = "<div class='test e'></div><div class='test'></div>";
	
		// Opera can't find a second classname (in 9.6)
		// Also, make sure that getElementsByClassName actually exists
		if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
			return;
		}
	
		// Safari caches class attributes, doesn't catch changes (in 3.2)
		div.lastChild.className = "e";
	
		if ( div.getElementsByClassName("e").length === 1 ) {
			return;
		}
	
		Expr.order.splice(1, 0, "CLASS");
		Expr.find.CLASS = function( match, context, isXML ) {
			if ( typeof context.getElementsByClassName !== "undefined" && !isXML ) {
				return context.getElementsByClassName(match[1]);
			}
		};
	
		// release memory in IE
		div = null;
	})();
	
	function dirNodeCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
		for ( var i = 0, l = checkSet.length; i < l; i++ ) {
			var elem = checkSet[i];
	
			if ( elem ) {
				var match = false;
	
				elem = elem[dir];
	
				while ( elem ) {
					if ( elem[ expando ] === doneName ) {
						match = checkSet[elem.sizset];
						break;
					}
	
					if ( elem.nodeType === 1 && !isXML ){
						elem[ expando ] = doneName;
						elem.sizset = i;
					}
	
					if ( elem.nodeName.toLowerCase() === cur ) {
						match = elem;
						break;
					}
	
					elem = elem[dir];
				}
	
				checkSet[i] = match;
			}
		}
	}
	
	function dirCheck( dir, cur, doneName, checkSet, nodeCheck, isXML ) {
		for ( var i = 0, l = checkSet.length; i < l; i++ ) {
			var elem = checkSet[i];
	
			if ( elem ) {
				var match = false;
	
				elem = elem[dir];
	
				while ( elem ) {
					if ( elem[ expando ] === doneName ) {
						match = checkSet[elem.sizset];
						break;
					}
	
					if ( elem.nodeType === 1 ) {
						if ( !isXML ) {
							elem[ expando ] = doneName;
							elem.sizset = i;
						}
	
						if ( typeof cur !== "string" ) {
							if ( elem === cur ) {
								match = true;
								break;
							}
	
						} else if ( Sizzle.filter( cur, [elem] ).length > 0 ) {
							match = elem;
							break;
						}
					}
	
					elem = elem[dir];
				}
	
				checkSet[i] = match;
			}
		}
	}
	
	if ( document.documentElement.contains ) {
		Sizzle.contains = function( a, b ) {
			return a !== b && (a.contains ? a.contains(b) : true);
		};
	
	} else if ( document.documentElement.compareDocumentPosition ) {
		Sizzle.contains = function( a, b ) {
			return !!(a.compareDocumentPosition(b) & 16);
		};
	
	} else {
		Sizzle.contains = function() {
			return false;
		};
	}
	
	Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
	
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};
	
	var posProcess = function( selector, context, seed ) {
		var match,
			tmpSet = [],
			later = "",
			root = context.nodeType ? [context] : context;
	
		// Position selectors must be done after the filter
		// And so must :not(positional) so we move all PSEUDOs to the end
		while ( (match = Expr.match.PSEUDO.exec( selector )) ) {
			later += match[0];
			selector = selector.replace( Expr.match.PSEUDO, "" );
		}
	
		selector = Expr.relative[selector] ? selector + "*" : selector;
	
		for ( var i = 0, l = root.length; i < l; i++ ) {
			Sizzle( selector, root[i], tmpSet, seed );
		}
	
		return Sizzle.filter( later, tmpSet );
	};
	
	// EXPOSE
	// Override sizzle attribute retrieval
	Sizzle.attr = jQuery.attr;
	Sizzle.selectors.attrMap = {};
	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.filters;
	jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	
	
	})();
	
	
	var runtil = /Until$/,
		rparentsprev = /^(?:parents|prevUntil|prevAll)/,
		// Note: This RegExp should be improved, or likely pulled from Sizzle
		rmultiselector = /,/,
		isSimple = /^.[^:#\[\.,]*$/,
		slice = Array.prototype.slice,
		POS = jQuery.expr.match.globalPOS,
		// methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};
	
	jQuery.fn.extend({
		find: function( selector ) {
			var self = this,
				i, l;
	
			if ( typeof selector !== "string" ) {
				return jQuery( selector ).filter(function() {
					for ( i = 0, l = self.length; i < l; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				});
			}
	
			var ret = this.pushStack( "", "find", selector ),
				length, n, r;
	
			for ( i = 0, l = this.length; i < l; i++ ) {
				length = ret.length;
				jQuery.find( selector, this[i], ret );
	
				if ( i > 0 ) {
					// Make sure that the results are unique
					for ( n = length; n < ret.length; n++ ) {
						for ( r = 0; r < length; r++ ) {
							if ( ret[r] === ret[n] ) {
								ret.splice(n--, 1);
								break;
							}
						}
					}
				}
			}
	
			return ret;
		},
	
		has: function( target ) {
			var targets = jQuery( target );
			return this.filter(function() {
				for ( var i = 0, l = targets.length; i < l; i++ ) {
					if ( jQuery.contains( this, targets[i] ) ) {
						return true;
					}
				}
			});
		},
	
		not: function( selector ) {
			return this.pushStack( winnow(this, selector, false), "not", selector);
		},
	
		filter: function( selector ) {
			return this.pushStack( winnow(this, selector, true), "filter", selector );
		},
	
		is: function( selector ) {
			return !!selector && (
				typeof selector === "string" ?
					// If this is a positional selector, check membership in the returned set
					// so $("p:first").is("p:last") won't return true for a doc with two "p".
					POS.test( selector ) ?
						jQuery( selector, this.context ).index( this[0] ) >= 0 :
						jQuery.filter( selector, this ).length > 0 :
					this.filter( selector ).length > 0 );
		},
	
		closest: function( selectors, context ) {
			var ret = [], i, l, cur = this[0];
	
			// Array (deprecated as of jQuery 1.7)
			if ( jQuery.isArray( selectors ) ) {
				var level = 1;
	
				while ( cur && cur.ownerDocument && cur !== context ) {
					for ( i = 0; i < selectors.length; i++ ) {
	
						if ( jQuery( cur ).is( selectors[ i ] ) ) {
							ret.push({ selector: selectors[ i ], elem: cur, level: level });
						}
					}
	
					cur = cur.parentNode;
					level++;
				}
	
				return ret;
			}
	
			// String
			var pos = POS.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;
	
			for ( i = 0, l = this.length; i < l; i++ ) {
				cur = this[i];
	
				while ( cur ) {
					if ( pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors) ) {
						ret.push( cur );
						break;
	
					} else {
						cur = cur.parentNode;
						if ( !cur || !cur.ownerDocument || cur === context || cur.nodeType === 11 ) {
							break;
						}
					}
				}
			}
	
			ret = ret.length > 1 ? jQuery.unique( ret ) : ret;
	
			return this.pushStack( ret, "closest", selectors );
		},
	
		// Determine the position of an element within
		// the matched set of elements
		index: function( elem ) {
	
			// No argument, return index in parent
			if ( !elem ) {
				return ( this[0] && this[0].parentNode ) ? this.prevAll().length : -1;
			}
	
			// index in selector
			if ( typeof elem === "string" ) {
				return jQuery.inArray( this[0], jQuery( elem ) );
			}
	
			// Locate the position of the desired element
			return jQuery.inArray(
				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[0] : elem, this );
		},
	
		add: function( selector, context ) {
			var set = typeof selector === "string" ?
					jQuery( selector, context ) :
					jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
				all = jQuery.merge( this.get(), set );
	
			return this.pushStack( isDisconnected( set[0] ) || isDisconnected( all[0] ) ?
				all :
				jQuery.unique( all ) );
		},
	
		andSelf: function() {
			return this.add( this.prevObject );
		}
	});
	
	// A painfully simple check to see if an element is disconnected
	// from a document (should be improved, where feasible).
	function isDisconnected( node ) {
		return !node || !node.parentNode || node.parentNode.nodeType === 11;
	}
	
	jQuery.each({
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return jQuery.dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return jQuery.nth( elem, 2, "nextSibling" );
		},
		prev: function( elem ) {
			return jQuery.nth( elem, 2, "previousSibling" );
		},
		nextAll: function( elem ) {
			return jQuery.dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return jQuery.dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return jQuery.sibling( elem.firstChild );
		},
		contents: function( elem ) {
			return jQuery.nodeName( elem, "iframe" ) ?
				elem.contentDocument || elem.contentWindow.document :
				jQuery.makeArray( elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var ret = jQuery.map( this, fn, until );
	
			if ( !runtil.test( name ) ) {
				selector = until;
			}
	
			if ( selector && typeof selector === "string" ) {
				ret = jQuery.filter( selector, ret );
			}
	
			ret = this.length > 1 && !guaranteedUnique[ name ] ? jQuery.unique( ret ) : ret;
	
			if ( (this.length > 1 || rmultiselector.test( selector )) && rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
	
			return this.pushStack( ret, name, slice.call( arguments ).join(",") );
		};
	});
	
	jQuery.extend({
		filter: function( expr, elems, not ) {
			if ( not ) {
				expr = ":not(" + expr + ")";
			}
	
			return elems.length === 1 ?
				jQuery.find.matchesSelector(elems[0], expr) ? [ elems[0] ] : [] :
				jQuery.find.matches(expr, elems);
		},
	
		dir: function( elem, dir, until ) {
			var matched = [],
				cur = elem[ dir ];
	
			while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
				if ( cur.nodeType === 1 ) {
					matched.push( cur );
				}
				cur = cur[dir];
			}
			return matched;
		},
	
		nth: function( cur, result, dir, elem ) {
			result = result || 1;
			var num = 0;
	
			for ( ; cur; cur = cur[dir] ) {
				if ( cur.nodeType === 1 && ++num === result ) {
					break;
				}
			}
	
			return cur;
		},
	
		sibling: function( n, elem ) {
			var r = [];
	
			for ( ; n; n = n.nextSibling ) {
				if ( n.nodeType === 1 && n !== elem ) {
					r.push( n );
				}
			}
	
			return r;
		}
	});
	
	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, keep ) {
	
		// Can't pass null or undefined to indexOf in Firefox 4
		// Set to 0 to skip string check
		qualifier = qualifier || 0;
	
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep(elements, function( elem, i ) {
				var retVal = !!qualifier.call( elem, i, elem );
				return retVal === keep;
			});
	
		} else if ( qualifier.nodeType ) {
			return jQuery.grep(elements, function( elem, i ) {
				return ( elem === qualifier ) === keep;
			});
	
		} else if ( typeof qualifier === "string" ) {
			var filtered = jQuery.grep(elements, function( elem ) {
				return elem.nodeType === 1;
			});
	
			if ( isSimple.test( qualifier ) ) {
				return jQuery.filter(qualifier, filtered, !keep);
			} else {
				qualifier = jQuery.filter( qualifier, filtered );
			}
		}
	
		return jQuery.grep(elements, function( elem, i ) {
			return ( jQuery.inArray( elem, qualifier ) >= 0 ) === keep;
		});
	}
	
	
	
	
	function createSafeFragment( document ) {
		var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();
	
		if ( safeFrag.createElement ) {
			while ( list.length ) {
				safeFrag.createElement(
					list.pop()
				);
			}
		}
		return safeFrag;
	}
	
	var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
			"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
		rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g,
		rleadingWhitespace = /^\s+/,
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
		rtagName = /<([\w:]+)/,
		rtbody = /<tbody/i,
		rhtml = /<|&#?\w+;/,
		rnoInnerhtml = /<(?:script|style)/i,
		rnocache = /<(?:script|object|embed|option|style)/i,
		rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptType = /\/(java|ecma)script/i,
		rcleanScript = /^\s*<!(?:\[CDATA\[|\-\-)/,
		wrapMap = {
			option: [ 1, "<select multiple='multiple'>", "</select>" ],
			legend: [ 1, "<fieldset>", "</fieldset>" ],
			thead: [ 1, "<table>", "</table>" ],
			tr: [ 2, "<table><tbody>", "</tbody></table>" ],
			td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
			col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
			area: [ 1, "<map>", "</map>" ],
			_default: [ 0, "", "" ]
		},
		safeFragment = createSafeFragment( document );
	
	wrapMap.optgroup = wrapMap.option;
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;
	
	// IE can't serialize <link> and <script> tags normally
	if ( !jQuery.support.htmlSerialize ) {
		wrapMap._default = [ 1, "div<div>", "</div>" ];
	}
	
	jQuery.fn.extend({
		text: function( value ) {
			return jQuery.access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
			}, null, value, arguments.length );
		},
	
		wrapAll: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each(function(i) {
					jQuery(this).wrapAll( html.call(this, i) );
				});
			}
	
			if ( this[0] ) {
				// The elements to wrap the target around
				var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);
	
				if ( this[0].parentNode ) {
					wrap.insertBefore( this[0] );
				}
	
				wrap.map(function() {
					var elem = this;
	
					while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
						elem = elem.firstChild;
					}
	
					return elem;
				}).append( this );
			}
	
			return this;
		},
	
		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each(function(i) {
					jQuery(this).wrapInner( html.call(this, i) );
				});
			}
	
			return this.each(function() {
				var self = jQuery( this ),
					contents = self.contents();
	
				if ( contents.length ) {
					contents.wrapAll( html );
	
				} else {
					self.append( html );
				}
			});
		},
	
		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );
	
			return this.each(function(i) {
				jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
			});
		},
	
		unwrap: function() {
			return this.parent().each(function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			}).end();
		},
	
		append: function() {
			return this.domManip(arguments, true, function( elem ) {
				if ( this.nodeType === 1 ) {
					this.appendChild( elem );
				}
			});
		},
	
		prepend: function() {
			return this.domManip(arguments, true, function( elem ) {
				if ( this.nodeType === 1 ) {
					this.insertBefore( elem, this.firstChild );
				}
			});
		},
	
		before: function() {
			if ( this[0] && this[0].parentNode ) {
				return this.domManip(arguments, false, function( elem ) {
					this.parentNode.insertBefore( elem, this );
				});
			} else if ( arguments.length ) {
				var set = jQuery.clean( arguments );
				set.push.apply( set, this.toArray() );
				return this.pushStack( set, "before", arguments );
			}
		},
	
		after: function() {
			if ( this[0] && this[0].parentNode ) {
				return this.domManip(arguments, false, function( elem ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				});
			} else if ( arguments.length ) {
				var set = this.pushStack( this, "after", arguments );
				set.push.apply( set, jQuery.clean(arguments) );
				return set;
			}
		},
	
		// keepData is for internal use only--do not document
		remove: function( selector, keepData ) {
			for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
				if ( !selector || jQuery.filter( selector, [ elem ] ).length ) {
					if ( !keepData && elem.nodeType === 1 ) {
						jQuery.cleanData( elem.getElementsByTagName("*") );
						jQuery.cleanData( [ elem ] );
					}
	
					if ( elem.parentNode ) {
						elem.parentNode.removeChild( elem );
					}
				}
			}
	
			return this;
		},
	
		empty: function() {
			for ( var i = 0, elem; (elem = this[i]) != null; i++ ) {
				// Remove element nodes and prevent memory leaks
				if ( elem.nodeType === 1 ) {
					jQuery.cleanData( elem.getElementsByTagName("*") );
				}
	
				// Remove any remaining nodes
				while ( elem.firstChild ) {
					elem.removeChild( elem.firstChild );
				}
			}
	
			return this;
		},
	
		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
	
			return this.map( function () {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			});
		},
	
		html: function( value ) {
			return jQuery.access( this, function( value ) {
				var elem = this[0] || {},
					i = 0,
					l = this.length;
	
				if ( value === undefined ) {
					return elem.nodeType === 1 ?
						elem.innerHTML.replace( rinlinejQuery, "" ) :
						null;
				}
	
	
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
					!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {
	
					value = value.replace( rxhtmlTag, "<$1></$2>" );
	
					try {
						for (; i < l; i++ ) {
							// Remove element nodes and prevent memory leaks
							elem = this[i] || {};
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( elem.getElementsByTagName( "*" ) );
								elem.innerHTML = value;
							}
						}
	
						elem = 0;
	
					// If using innerHTML throws an exception, use the fallback method
					} catch(e) {}
				}
	
				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},
	
		replaceWith: function( value ) {
			if ( this[0] && this[0].parentNode ) {
				// Make sure that the elements are removed from the DOM before they are inserted
				// this can help fix replacing a parent with child elements
				if ( jQuery.isFunction( value ) ) {
					return this.each(function(i) {
						var self = jQuery(this), old = self.html();
						self.replaceWith( value.call( this, i, old ) );
					});
				}
	
				if ( typeof value !== "string" ) {
					value = jQuery( value ).detach();
				}
	
				return this.each(function() {
					var next = this.nextSibling,
						parent = this.parentNode;
	
					jQuery( this ).remove();
	
					if ( next ) {
						jQuery(next).before( value );
					} else {
						jQuery(parent).append( value );
					}
				});
			} else {
				return this.length ?
					this.pushStack( jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value ) :
					this;
			}
		},
	
		detach: function( selector ) {
			return this.remove( selector, true );
		},
	
		domManip: function( args, table, callback ) {
			var results, first, fragment, parent,
				value = args[0],
				scripts = [];
	
			// We can't cloneNode fragments that contain checked, in WebKit
			if ( !jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test( value ) ) {
				return this.each(function() {
					jQuery(this).domManip( args, table, callback, true );
				});
			}
	
			if ( jQuery.isFunction(value) ) {
				return this.each(function(i) {
					var self = jQuery(this);
					args[0] = value.call(this, i, table ? self.html() : undefined);
					self.domManip( args, table, callback );
				});
			}
	
			if ( this[0] ) {
				parent = value && value.parentNode;
	
				// If we're in a fragment, just use that instead of building a new one
				if ( jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length ) {
					results = { fragment: parent };
	
				} else {
					results = jQuery.buildFragment( args, this, scripts );
				}
	
				fragment = results.fragment;
	
				if ( fragment.childNodes.length === 1 ) {
					first = fragment = fragment.firstChild;
				} else {
					first = fragment.firstChild;
				}
	
				if ( first ) {
					table = table && jQuery.nodeName( first, "tr" );
	
					for ( var i = 0, l = this.length, lastIndex = l - 1; i < l; i++ ) {
						callback.call(
							table ?
								root(this[i], first) :
								this[i],
							// Make sure that we do not leak memory by inadvertently discarding
							// the original fragment (which might have attached data) instead of
							// using it; in addition, use the original fragment object for the last
							// item instead of first because it can end up being emptied incorrectly
							// in certain situations (Bug #8070).
							// Fragments from the fragment cache must always be cloned and never used
							// in place.
							results.cacheable || ( l > 1 && i < lastIndex ) ?
								jQuery.clone( fragment, true, true ) :
								fragment
						);
					}
				}
	
				if ( scripts.length ) {
					jQuery.each( scripts, function( i, elem ) {
						if ( elem.src ) {
							jQuery.ajax({
								type: "GET",
								global: false,
								url: elem.src,
								async: false,
								dataType: "script"
							});
						} else {
							jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( rcleanScript, "/*$0*/" ) );
						}
	
						if ( elem.parentNode ) {
							elem.parentNode.removeChild( elem );
						}
					});
				}
			}
	
			return this;
		}
	});
	
	function root( elem, cur ) {
		return jQuery.nodeName(elem, "table") ?
			(elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild(elem.ownerDocument.createElement("tbody"))) :
			elem;
	}
	
	function cloneCopyEvent( src, dest ) {
	
		if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
			return;
		}
	
		var type, i, l,
			oldData = jQuery._data( src ),
			curData = jQuery._data( dest, oldData ),
			events = oldData.events;
	
		if ( events ) {
			delete curData.handle;
			curData.events = {};
	
			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	
		// make the cloned public data object a copy from the original
		if ( curData.data ) {
			curData.data = jQuery.extend( {}, curData.data );
		}
	}
	
	function cloneFixAttributes( src, dest ) {
		var nodeName;
	
		// We do not need to do anything for non-Elements
		if ( dest.nodeType !== 1 ) {
			return;
		}
	
		// clearAttributes removes the attributes, which we don't want,
		// but also removes the attachEvent events, which we *do* want
		if ( dest.clearAttributes ) {
			dest.clearAttributes();
		}
	
		// mergeAttributes, in contrast, only merges back on the
		// original attributes, not the events
		if ( dest.mergeAttributes ) {
			dest.mergeAttributes( src );
		}
	
		nodeName = dest.nodeName.toLowerCase();
	
		// IE6-8 fail to clone children inside object elements that use
		// the proprietary classid attribute value (rather than the type
		// attribute) to identify the type of content to display
		if ( nodeName === "object" ) {
			dest.outerHTML = src.outerHTML;
	
		} else if ( nodeName === "input" && (src.type === "checkbox" || src.type === "radio") ) {
			// IE6-8 fails to persist the checked state of a cloned checkbox
			// or radio button. Worse, IE6-7 fail to give the cloned element
			// a checked appearance if the defaultChecked value isn't also set
			if ( src.checked ) {
				dest.defaultChecked = dest.checked = src.checked;
			}
	
			// IE6-7 get confused and end up setting the value of a cloned
			// checkbox/radio button to an empty string instead of "on"
			if ( dest.value !== src.value ) {
				dest.value = src.value;
			}
	
		// IE6-8 fails to return the selected option to the default selected
		// state when cloning options
		} else if ( nodeName === "option" ) {
			dest.selected = src.defaultSelected;
	
		// IE6-8 fails to set the defaultValue to the correct value when
		// cloning other types of input fields
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
	
		// IE blanks contents when cloning scripts
		} else if ( nodeName === "script" && dest.text !== src.text ) {
			dest.text = src.text;
		}
	
		// Event data gets referenced instead of copied if the expando
		// gets copied too
		dest.removeAttribute( jQuery.expando );
	
		// Clear flags for bubbling special change/submit events, they must
		// be reattached when the newly cloned events are first activated
		dest.removeAttribute( "_submit_attached" );
		dest.removeAttribute( "_change_attached" );
	}
	
	jQuery.buildFragment = function( args, nodes, scripts ) {
		var fragment, cacheable, cacheresults, doc,
		first = args[ 0 ];
	
		// nodes may contain either an explicit document object,
		// a jQuery collection or context object.
		// If nodes[0] contains a valid object to assign to doc
		if ( nodes && nodes[0] ) {
			doc = nodes[0].ownerDocument || nodes[0];
		}
	
		// Ensure that an attr object doesn't incorrectly stand in as a document object
		// Chrome and Firefox seem to allow this to occur and will throw exception
		// Fixes #8950
		if ( !doc.createDocumentFragment ) {
			doc = document;
		}
	
		// Only cache "small" (1/2 KB) HTML strings that are associated with the main document
		// Cloning options loses the selected state, so don't cache them
		// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
		// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
		// Lastly, IE6,7,8 will not correctly reuse cached fragments that were created from unknown elems #10501
		if ( args.length === 1 && typeof first === "string" && first.length < 512 && doc === document &&
			first.charAt(0) === "<" && !rnocache.test( first ) &&
			(jQuery.support.checkClone || !rchecked.test( first )) &&
			(jQuery.support.html5Clone || !rnoshimcache.test( first )) ) {
	
			cacheable = true;
	
			cacheresults = jQuery.fragments[ first ];
			if ( cacheresults && cacheresults !== 1 ) {
				fragment = cacheresults;
			}
		}
	
		if ( !fragment ) {
			fragment = doc.createDocumentFragment();
			jQuery.clean( args, doc, fragment, scripts );
		}
	
		if ( cacheable ) {
			jQuery.fragments[ first ] = cacheresults ? fragment : 1;
		}
	
		return { fragment: fragment, cacheable: cacheable };
	};
	
	jQuery.fragments = {};
	
	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var ret = [],
				insert = jQuery( selector ),
				parent = this.length === 1 && this[0].parentNode;
	
			if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
				insert[ original ]( this[0] );
				return this;
	
			} else {
				for ( var i = 0, l = insert.length; i < l; i++ ) {
					var elems = ( i > 0 ? this.clone(true) : this ).get();
					jQuery( insert[i] )[ original ]( elems );
					ret = ret.concat( elems );
				}
	
				return this.pushStack( ret, name, insert.selector );
			}
		};
	});
	
	function getAll( elem ) {
		if ( typeof elem.getElementsByTagName !== "undefined" ) {
			return elem.getElementsByTagName( "*" );
	
		} else if ( typeof elem.querySelectorAll !== "undefined" ) {
			return elem.querySelectorAll( "*" );
	
		} else {
			return [];
		}
	}
	
	// Used in clean, fixes the defaultChecked property
	function fixDefaultChecked( elem ) {
		if ( elem.type === "checkbox" || elem.type === "radio" ) {
			elem.defaultChecked = elem.checked;
		}
	}
	// Finds all inputs and passes them to fixDefaultChecked
	function findInputs( elem ) {
		var nodeName = ( elem.nodeName || "" ).toLowerCase();
		if ( nodeName === "input" ) {
			fixDefaultChecked( elem );
		// Skip scripts, get other children
		} else if ( nodeName !== "script" && typeof elem.getElementsByTagName !== "undefined" ) {
			jQuery.grep( elem.getElementsByTagName("input"), fixDefaultChecked );
		}
	}
	
	// Derived From: http://www.iecss.com/shimprove/javascript/shimprove.1-0-1.js
	function shimCloneNode( elem ) {
		var div = document.createElement( "div" );
		safeFragment.appendChild( div );
	
		div.innerHTML = elem.outerHTML;
		return div.firstChild;
	}
	
	jQuery.extend({
		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var srcElements,
				destElements,
				i,
				// IE<=8 does not properly clone detached, unknown element nodes
				clone = jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ?
					elem.cloneNode( true ) :
					shimCloneNode( elem );
	
			if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
					(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
				// IE copies events bound via attachEvent when using cloneNode.
				// Calling detachEvent on the clone will also remove the events
				// from the original. In order to get around this, we use some
				// proprietary methods to clear the events. Thanks to MooTools
				// guys for this hotness.
	
				cloneFixAttributes( elem, clone );
	
				// Using Sizzle here is crazy slow, so we use getElementsByTagName instead
				srcElements = getAll( elem );
				destElements = getAll( clone );
	
				// Weird iteration because IE will replace the length property
				// with an element if you are cloning the body and one of the
				// elements on the page has a name or id of "length"
				for ( i = 0; srcElements[i]; ++i ) {
					// Ensure that the destination node is not null; Fixes #9587
					if ( destElements[i] ) {
						cloneFixAttributes( srcElements[i], destElements[i] );
					}
				}
			}
	
			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				cloneCopyEvent( elem, clone );
	
				if ( deepDataAndEvents ) {
					srcElements = getAll( elem );
					destElements = getAll( clone );
	
					for ( i = 0; srcElements[i]; ++i ) {
						cloneCopyEvent( srcElements[i], destElements[i] );
					}
				}
			}
	
			srcElements = destElements = null;
	
			// Return the cloned set
			return clone;
		},
	
		clean: function( elems, context, fragment, scripts ) {
			var checkScriptType, script, j,
					ret = [];
	
			context = context || document;
	
			// !context.createElement fails in IE with an error but returns typeof 'object'
			if ( typeof context.createElement === "undefined" ) {
				context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
			}
	
			for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
				if ( typeof elem === "number" ) {
					elem += "";
				}
	
				if ( !elem ) {
					continue;
				}
	
				// Convert html string into DOM nodes
				if ( typeof elem === "string" ) {
					if ( !rhtml.test( elem ) ) {
						elem = context.createTextNode( elem );
					} else {
						// Fix "XHTML"-style tags in all browsers
						elem = elem.replace(rxhtmlTag, "<$1></$2>");
	
						// Trim whitespace, otherwise indexOf won't work as expected
						var tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase(),
							wrap = wrapMap[ tag ] || wrapMap._default,
							depth = wrap[0],
							div = context.createElement("div"),
							safeChildNodes = safeFragment.childNodes,
							remove;
	
						// Append wrapper element to unknown element safe doc fragment
						if ( context === document ) {
							// Use the fragment we've already created for this document
							safeFragment.appendChild( div );
						} else {
							// Use a fragment created with the owner document
							createSafeFragment( context ).appendChild( div );
						}
	
						// Go to html and back, then peel off extra wrappers
						div.innerHTML = wrap[1] + elem + wrap[2];
	
						// Move to the right depth
						while ( depth-- ) {
							div = div.lastChild;
						}
	
						// Remove IE's autoinserted <tbody> from table fragments
						if ( !jQuery.support.tbody ) {
	
							// String was a <table>, *may* have spurious <tbody>
							var hasBody = rtbody.test(elem),
								tbody = tag === "table" && !hasBody ?
									div.firstChild && div.firstChild.childNodes :
	
									// String was a bare <thead> or <tfoot>
									wrap[1] === "<table>" && !hasBody ?
										div.childNodes :
										[];
	
							for ( j = tbody.length - 1; j >= 0 ; --j ) {
								if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
									tbody[ j ].parentNode.removeChild( tbody[ j ] );
								}
							}
						}
	
						// IE completely kills leading whitespace when innerHTML is used
						if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
							div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
						}
	
						elem = div.childNodes;
	
						// Clear elements from DocumentFragment (safeFragment or otherwise)
						// to avoid hoarding elements. Fixes #11356
						if ( div ) {
							div.parentNode.removeChild( div );
	
							// Guard against -1 index exceptions in FF3.6
							if ( safeChildNodes.length > 0 ) {
								remove = safeChildNodes[ safeChildNodes.length - 1 ];
	
								if ( remove && remove.parentNode ) {
									remove.parentNode.removeChild( remove );
								}
							}
						}
					}
				}
	
				// Resets defaultChecked for any radios and checkboxes
				// about to be appended to the DOM in IE 6/7 (#8060)
				var len;
				if ( !jQuery.support.appendChecked ) {
					if ( elem[0] && typeof (len = elem.length) === "number" ) {
						for ( j = 0; j < len; j++ ) {
							findInputs( elem[j] );
						}
					} else {
						findInputs( elem );
					}
				}
	
				if ( elem.nodeType ) {
					ret.push( elem );
				} else {
					ret = jQuery.merge( ret, elem );
				}
			}
	
			if ( fragment ) {
				checkScriptType = function( elem ) {
					return !elem.type || rscriptType.test( elem.type );
				};
				for ( i = 0; ret[i]; i++ ) {
					script = ret[i];
					if ( scripts && jQuery.nodeName( script, "script" ) && (!script.type || rscriptType.test( script.type )) ) {
						scripts.push( script.parentNode ? script.parentNode.removeChild( script ) : script );
	
					} else {
						if ( script.nodeType === 1 ) {
							var jsTags = jQuery.grep( script.getElementsByTagName( "script" ), checkScriptType );
	
							ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
						}
						fragment.appendChild( script );
					}
				}
			}
	
			return ret;
		},
	
		cleanData: function( elems ) {
			var data, id,
				cache = jQuery.cache,
				special = jQuery.event.special,
				deleteExpando = jQuery.support.deleteExpando;
	
			for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
				if ( elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()] ) {
					continue;
				}
	
				id = elem[ jQuery.expando ];
	
				if ( id ) {
					data = cache[ id ];
	
					if ( data && data.events ) {
						for ( var type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );
	
							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
	
						// Null the DOM reference to avoid IE6/7/8 leak (#7054)
						if ( data.handle ) {
							data.handle.elem = null;
						}
					}
	
					if ( deleteExpando ) {
						delete elem[ jQuery.expando ];
	
					} else if ( elem.removeAttribute ) {
						elem.removeAttribute( jQuery.expando );
					}
	
					delete cache[ id ];
				}
			}
		}
	});
	
	
	
	
	var ralpha = /alpha\([^)]*\)/i,
		ropacity = /opacity=([^)]*)/,
		// fixed for IE9, see #8346
		rupper = /([A-Z]|^ms)/g,
		rnum = /^[\-+]?(?:\d*\.)?\d+$/i,
		rnumnonpx = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
		rrelNum = /^([\-+])=([\-+.\de]+)/,
		rmargin = /^margin/,
	
		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	
		// order is important!
		cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	
		curCSS,
	
		getComputedStyle,
		currentStyle;
	
	jQuery.fn.css = function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	};
	
	jQuery.extend({
		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {
						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
	
					} else {
						return elem.style.opacity;
					}
				}
			}
		},
	
		// Exclude the following css properties to add px
		cssNumber: {
			"fillOpacity": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},
	
		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			// normalize float css property
			"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
		},
	
		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {
			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}
	
			// Make sure that we're working with the right name
			var ret, type, origName = jQuery.camelCase( name ),
				style = elem.style, hooks = jQuery.cssHooks[ origName ];
	
			name = jQuery.cssProps[ origName ] || origName;
	
			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;
	
				// convert relative number strings (+= or -=) to relative numbers. #7345
				if ( type === "string" && (ret = rrelNum.exec( value )) ) {
					value = ( +( ret[1] + 1) * +ret[2] ) + parseFloat( jQuery.css( elem, name ) );
					// Fixes bug #9237
					type = "number";
				}
	
				// Make sure that NaN and null values aren't set. See: #7116
				if ( value == null || type === "number" && isNaN( value ) ) {
					return;
				}
	
				// If a number was passed in, add 'px' to the (except for certain CSS properties)
				if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
					value += "px";
				}
	
				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value )) !== undefined ) {
					// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
					// Fixes bug #5509
					try {
						style[ name ] = value;
					} catch(e) {}
				}
	
			} else {
				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
					return ret;
				}
	
				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},
	
		css: function( elem, name, extra ) {
			var ret, hooks;
	
			// Make sure that we're working with the right name
			name = jQuery.camelCase( name );
			hooks = jQuery.cssHooks[ name ];
			name = jQuery.cssProps[ name ] || name;
	
			// cssFloat needs a special treatment
			if ( name === "cssFloat" ) {
				name = "float";
			}
	
			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, true, extra )) !== undefined ) {
				return ret;
	
			// Otherwise, if a way to get the computed value exists, use that
			} else if ( curCSS ) {
				return curCSS( elem, name );
			}
		},
	
		// A method for quickly swapping in/out CSS properties to get correct calculations
		swap: function( elem, options, callback ) {
			var old = {},
				ret, name;
	
			// Remember the old values, and insert the new ones
			for ( name in options ) {
				old[ name ] = elem.style[ name ];
				elem.style[ name ] = options[ name ];
			}
	
			ret = callback.call( elem );
	
			// Revert the old values
			for ( name in options ) {
				elem.style[ name ] = old[ name ];
			}
	
			return ret;
		}
	});
	
	// DEPRECATED in 1.3, Use jQuery.css() instead
	jQuery.curCSS = jQuery.css;
	
	if ( document.defaultView && document.defaultView.getComputedStyle ) {
		getComputedStyle = function( elem, name ) {
			var ret, defaultView, computedStyle, width,
				style = elem.style;
	
			name = name.replace( rupper, "-$1" ).toLowerCase();
	
			if ( (defaultView = elem.ownerDocument.defaultView) &&
					(computedStyle = defaultView.getComputedStyle( elem, null )) ) {
	
				ret = computedStyle.getPropertyValue( name );
				if ( ret === "" && !jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {
					ret = jQuery.style( elem, name );
				}
			}
	
			// A tribute to the "awesome hack by Dean Edwards"
			// WebKit uses "computed value (percentage if specified)" instead of "used value" for margins
			// which is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !jQuery.support.pixelMargin && computedStyle && rmargin.test( name ) && rnumnonpx.test( ret ) ) {
				width = style.width;
				style.width = ret;
				ret = computedStyle.width;
				style.width = width;
			}
	
			return ret;
		};
	}
	
	if ( document.documentElement.currentStyle ) {
		currentStyle = function( elem, name ) {
			var left, rsLeft, uncomputed,
				ret = elem.currentStyle && elem.currentStyle[ name ],
				style = elem.style;
	
			// Avoid setting ret to empty string here
			// so we don't default to auto
			if ( ret == null && style && (uncomputed = style[ name ]) ) {
				ret = uncomputed;
			}
	
			// From the awesome hack by Dean Edwards
			// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
	
			// If we're not dealing with a regular pixel number
			// but a number that has a weird ending, we need to convert it to pixels
			if ( rnumnonpx.test( ret ) ) {
	
				// Remember the original values
				left = style.left;
				rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;
	
				// Put in the new values to get a computed value out
				if ( rsLeft ) {
					elem.runtimeStyle.left = elem.currentStyle.left;
				}
				style.left = name === "fontSize" ? "1em" : ret;
				ret = style.pixelLeft + "px";
	
				// Revert the changed values
				style.left = left;
				if ( rsLeft ) {
					elem.runtimeStyle.left = rsLeft;
				}
			}
	
			return ret === "" ? "auto" : ret;
		};
	}
	
	curCSS = getComputedStyle || currentStyle;
	
	function getWidthOrHeight( elem, name, extra ) {
	
		// Start with offset property
		var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			i = name === "width" ? 1 : 0,
			len = 4;
	
		if ( val > 0 ) {
			if ( extra !== "border" ) {
				for ( ; i < len; i += 2 ) {
					if ( !extra ) {
						val -= parseFloat( jQuery.css( elem, "padding" + cssExpand[ i ] ) ) || 0;
					}
					if ( extra === "margin" ) {
						val += parseFloat( jQuery.css( elem, extra + cssExpand[ i ] ) ) || 0;
					} else {
						val -= parseFloat( jQuery.css( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
					}
				}
			}
	
			return val + "px";
		}
	
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}
	
		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}
	
		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	
		// Add padding, border, margin
		if ( extra ) {
			for ( ; i < len; i += 2 ) {
				val += parseFloat( jQuery.css( elem, "padding" + cssExpand[ i ] ) ) || 0;
				if ( extra !== "padding" ) {
					val += parseFloat( jQuery.css( elem, "border" + cssExpand[ i ] + "Width" ) ) || 0;
				}
				if ( extra === "margin" ) {
					val += parseFloat( jQuery.css( elem, extra + cssExpand[ i ]) ) || 0;
				}
			}
		}
	
		return val + "px";
	}
	
	jQuery.each([ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {
					if ( elem.offsetWidth !== 0 ) {
						return getWidthOrHeight( elem, name, extra );
					} else {
						return jQuery.swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						});
					}
				}
			},
	
			set: function( elem, value ) {
				return rnum.test( value ) ?
					value + "px" :
					value;
			}
		};
	});
	
	if ( !jQuery.support.opacity ) {
		jQuery.cssHooks.opacity = {
			get: function( elem, computed ) {
				// IE uses filters for opacity
				return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
					( parseFloat( RegExp.$1 ) / 100 ) + "" :
					computed ? "1" : "";
			},
	
			set: function( elem, value ) {
				var style = elem.style,
					currentStyle = elem.currentStyle,
					opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
					filter = currentStyle && currentStyle.filter || style.filter || "";
	
				// IE has trouble with opacity if it does not have layout
				// Force it by setting the zoom level
				style.zoom = 1;
	
				// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
				if ( value >= 1 && jQuery.trim( filter.replace( ralpha, "" ) ) === "" ) {
	
					// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
					// if "filter:" is present at all, clearType is disabled, we want to avoid this
					// style.removeAttribute is IE Only, but so apparently is this code path...
					style.removeAttribute( "filter" );
	
					// if there there is no filter style applied in a css rule, we are done
					if ( currentStyle && !currentStyle.filter ) {
						return;
					}
				}
	
				// otherwise, set new filter values
				style.filter = ralpha.test( filter ) ?
					filter.replace( ralpha, opacity ) :
					filter + " " + opacity;
			}
		};
	}
	
	jQuery(function() {
		// This hook cannot be added until DOM ready because the support test
		// for it is not run until after DOM ready
		if ( !jQuery.support.reliableMarginRight ) {
			jQuery.cssHooks.marginRight = {
				get: function( elem, computed ) {
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// Work around by temporarily setting element display to inline-block
					return jQuery.swap( elem, { "display": "inline-block" }, function() {
						if ( computed ) {
							return curCSS( elem, "margin-right" );
						} else {
							return elem.style.marginRight;
						}
					});
				}
			};
		}
	});
	
	if ( jQuery.expr && jQuery.expr.filters ) {
		jQuery.expr.filters.hidden = function( elem ) {
			var width = elem.offsetWidth,
				height = elem.offsetHeight;
	
			return ( width === 0 && height === 0 ) || (!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
		};
	
		jQuery.expr.filters.visible = function( elem ) {
			return !jQuery.expr.filters.hidden( elem );
		};
	}
	
	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
	
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i,
	
					// assumes a single number if not a string
					parts = typeof value === "string" ? value.split(" ") : [ value ],
					expanded = {};
	
				for ( i = 0; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}
	
				return expanded;
			}
		};
	});
	
	
	
	
	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rhash = /#.*$/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
		rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
		rquery = /\?/,
		rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
		rselectTextarea = /^(?:select|textarea)/i,
		rspacesAjax = /\s+/,
		rts = /([?&])_=[^&]*/,
		rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
	
		// Keep a copy of the old load method
		_load = jQuery.fn.load,
	
		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},
	
		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},
	
		// Document location
		ajaxLocation,
	
		// Document location segments
		ajaxLocParts,
	
		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = ["*/"] + ["*"];
	
	// #8138, IE may throw an exception when accessing
	// a field from window.location if document.domain has been set
	try {
		ajaxLocation = location.href;
	} catch( e ) {
		// Use the href attribute of an A element
		// since IE will modify it given document.location
		ajaxLocation = document.createElement( "a" );
		ajaxLocation.href = "";
		ajaxLocation = ajaxLocation.href;
	}
	
	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];
	
	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {
	
		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {
	
			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}
	
			if ( jQuery.isFunction( func ) ) {
				var dataTypes = dataTypeExpression.toLowerCase().split( rspacesAjax ),
					i = 0,
					length = dataTypes.length,
					dataType,
					list,
					placeBefore;
	
				// For each dataType in the dataTypeExpression
				for ( ; i < length; i++ ) {
					dataType = dataTypes[ i ];
					// We control if we're asked to add before
					// any existing element
					placeBefore = /^\+/.test( dataType );
					if ( placeBefore ) {
						dataType = dataType.substr( 1 ) || "*";
					}
					list = structure[ dataType ] = structure[ dataType ] || [];
					// then we add to the structure accordingly
					list[ placeBefore ? "unshift" : "push" ]( func );
				}
			}
		};
	}
	
	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,
			dataType /* internal */, inspected /* internal */ ) {
	
		dataType = dataType || options.dataTypes[ 0 ];
		inspected = inspected || {};
	
		inspected[ dataType ] = true;
	
		var list = structure[ dataType ],
			i = 0,
			length = list ? list.length : 0,
			executeOnly = ( structure === prefilters ),
			selection;
	
		for ( ; i < length && ( executeOnly || !selection ); i++ ) {
			selection = list[ i ]( options, originalOptions, jqXHR );
			// If we got redirected to another dataType
			// we try there if executing only and not done already
			if ( typeof selection === "string" ) {
				if ( !executeOnly || inspected[ selection ] ) {
					selection = undefined;
				} else {
					options.dataTypes.unshift( selection );
					selection = inspectPrefiltersOrTransports(
							structure, options, originalOptions, jqXHR, selection, inspected );
				}
			}
		}
		// If we're only executing or nothing was selected
		// we try the catchall dataType if not done already
		if ( ( executeOnly || !selection ) && !inspected[ "*" ] ) {
			selection = inspectPrefiltersOrTransports(
					structure, options, originalOptions, jqXHR, "*", inspected );
		}
		// unnecessary when only executing (prefilters)
		// but it'll be ignored by the caller in that case
		return selection;
	}
	
	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};
		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}
	}
	
	jQuery.fn.extend({
		load: function( url, params, callback ) {
			if ( typeof url !== "string" && _load ) {
				return _load.apply( this, arguments );
	
			// Don't do a request if no elements are being requested
			} else if ( !this.length ) {
				return this;
			}
	
			var off = url.indexOf( " " );
			if ( off >= 0 ) {
				var selector = url.slice( off, url.length );
				url = url.slice( 0, off );
			}
	
			// Default to a GET request
			var type = "GET";
	
			// If the second parameter was provided
			if ( params ) {
				// If it's a function
				if ( jQuery.isFunction( params ) ) {
					// We assume that it's the callback
					callback = params;
					params = undefined;
	
				// Otherwise, build a param string
				} else if ( typeof params === "object" ) {
					params = jQuery.param( params, jQuery.ajaxSettings.traditional );
					type = "POST";
				}
			}
	
			var self = this;
	
			// Request the remote document
			jQuery.ajax({
				url: url,
				type: type,
				dataType: "html",
				data: params,
				// Complete callback (responseText is used internally)
				complete: function( jqXHR, status, responseText ) {
					// Store the response as specified by the jqXHR object
					responseText = jqXHR.responseText;
					// If successful, inject the HTML into all the matched elements
					if ( jqXHR.isResolved() ) {
						// #4825: Get the actual response in case
						// a dataFilter is present in ajaxSettings
						jqXHR.done(function( r ) {
							responseText = r;
						});
						// See if a selector was specified
						self.html( selector ?
							// Create a dummy div to hold the results
							jQuery("<div>")
								// inject the contents of the document in, removing the scripts
								// to avoid any 'Permission Denied' errors in IE
								.append(responseText.replace(rscript, ""))
	
								// Locate the specified elements
								.find(selector) :
	
							// If not, just inject the full result
							responseText );
					}
	
					if ( callback ) {
						self.each( callback, [ responseText, status, jqXHR ] );
					}
				}
			});
	
			return this;
		},
	
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
	
		serializeArray: function() {
			return this.map(function(){
				return this.elements ? jQuery.makeArray( this.elements ) : this;
			})
			.filter(function(){
				return this.name && !this.disabled &&
					( this.checked || rselectTextarea.test( this.nodeName ) ||
						rinput.test( this.type ) );
			})
			.map(function( i, elem ){
				var val = jQuery( this ).val();
	
				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val, i ){
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						}) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			}).get();
		}
	});
	
	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split( " " ), function( i, o ){
		jQuery.fn[ o ] = function( f ){
			return this.on( o, f );
		};
	});
	
	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {
			// shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}
	
			return jQuery.ajax({
				type: method,
				url: url,
				data: data,
				success: callback,
				dataType: type
			});
		};
	});
	
	jQuery.extend({
	
		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		},
	
		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},
	
		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			if ( settings ) {
				// Building a settings object
				ajaxExtend( target, jQuery.ajaxSettings );
			} else {
				// Extending ajaxSettings
				settings = target;
				target = jQuery.ajaxSettings;
			}
			ajaxExtend( target, settings );
			return target;
		},
	
		ajaxSettings: {
			url: ajaxLocation,
			isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
			global: true,
			type: "GET",
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			processData: true,
			async: true,
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			traditional: false,
			headers: {},
			*/
	
			accepts: {
				xml: "application/xml, text/xml",
				html: "text/html",
				text: "text/plain",
				json: "application/json, text/javascript",
				"*": allTypes
			},
	
			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},
	
			responseFields: {
				xml: "responseXML",
				text: "responseText"
			},
	
			// List of data converters
			// 1) key format is "source_type destination_type" (a single space in-between)
			// 2) the catchall symbol "*" can be used for source_type
			converters: {
	
				// Convert anything to text
				"* text": window.String,
	
				// Text to html (true = no transformation)
				"text html": true,
	
				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,
	
				// Parse text as xml
				"text xml": jQuery.parseXML
			},
	
			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				context: true,
				url: true
			}
		},
	
		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),
	
		// Main method
		ajax: function( url, options ) {
	
			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}
	
			// Force options to be an object
			options = options || {};
	
			var // Create the final options object
				s = jQuery.ajaxSetup( {}, options ),
				// Callbacks context
				callbackContext = s.context || s,
				// Context for global events
				// It's the callbackContext if one was provided in the options
				// and if it's a DOM node or a jQuery collection
				globalEventContext = callbackContext !== s &&
					( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
							jQuery( callbackContext ) : jQuery.event,
				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),
				// Status-dependent callbacks
				statusCode = s.statusCode || {},
				// ifModified key
				ifModifiedKey,
				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},
				// Response headers
				responseHeadersString,
				responseHeaders,
				// transport
				transport,
				// timeout handle
				timeoutTimer,
				// Cross-domain detection vars
				parts,
				// The jqXHR state
				state = 0,
				// To know if global events are to be dispatched
				fireGlobals,
				// Loop variable
				i,
				// Fake xhr
				jqXHR = {
	
					readyState: 0,
	
					// Caches the header
					setRequestHeader: function( name, value ) {
						if ( !state ) {
							var lname = name.toLowerCase();
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},
	
					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},
	
					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match === undefined ? null : match;
					},
	
					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},
	
					// Cancel the request
					abort: function( statusText ) {
						statusText = statusText || "abort";
						if ( transport ) {
							transport.abort( statusText );
						}
						done( 0, statusText );
						return this;
					}
				};
	
			// Callback for when everything is done
			// It is defined here because jslint complains if it is declared
			// at the end of the function (which would be more logical and readable)
			function done( status, nativeStatusText, responses, headers ) {
	
				// Called once
				if ( state === 2 ) {
					return;
				}
	
				// State is "done" now
				state = 2;
	
				// Clear timeout if it exists
				if ( timeoutTimer ) {
					clearTimeout( timeoutTimer );
				}
	
				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;
	
				// Cache response headers
				responseHeadersString = headers || "";
	
				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;
	
				var isSuccess,
					success,
					error,
					statusText = nativeStatusText,
					response = responses ? ajaxHandleResponses( s, jqXHR, responses ) : undefined,
					lastModified,
					etag;
	
				// If successful, handle type chaining
				if ( status >= 200 && status < 300 || status === 304 ) {
	
					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
	
						if ( ( lastModified = jqXHR.getResponseHeader( "Last-Modified" ) ) ) {
							jQuery.lastModified[ ifModifiedKey ] = lastModified;
						}
						if ( ( etag = jqXHR.getResponseHeader( "Etag" ) ) ) {
							jQuery.etag[ ifModifiedKey ] = etag;
						}
					}
	
					// If not modified
					if ( status === 304 ) {
	
						statusText = "notmodified";
						isSuccess = true;
	
					// If we have data
					} else {
	
						try {
							success = ajaxConvert( s, response );
							statusText = "success";
							isSuccess = true;
						} catch(e) {
							// We have a parsererror
							statusText = "parsererror";
							error = e;
						}
					}
				} else {
					// We extract error from statusText
					// then normalize statusText and status for non-aborts
					error = statusText;
					if ( !statusText || status ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}
	
				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = "" + ( nativeStatusText || statusText );
	
				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}
	
				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;
	
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
							[ jqXHR, s, isSuccess ? success : error ] );
				}
	
				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );
	
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}
	
			// Attach deferreds
			deferred.promise( jqXHR );
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;
			jqXHR.complete = completeDeferred.add;
	
			// Status-dependent callbacks
			jqXHR.statusCode = function( map ) {
				if ( map ) {
					var tmp;
					if ( state < 2 ) {
						for ( tmp in map ) {
							statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
						}
					} else {
						tmp = map[ jqXHR.status ];
						jqXHR.then( tmp, tmp );
					}
				}
				return this;
			};
	
			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
			// We also use the url parameter if available
			s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );
	
			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( rspacesAjax );
	
			// Determine if a cross-domain request is in order
			if ( s.crossDomain == null ) {
				parts = rurl.exec( s.url.toLowerCase() );
				s.crossDomain = !!( parts &&
					( parts[ 1 ] != ajaxLocParts[ 1 ] || parts[ 2 ] != ajaxLocParts[ 2 ] ||
						( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
							( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
				);
			}
	
			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}
	
			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );
	
			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return false;
			}
	
			// We can fire global events as of now if asked to
			fireGlobals = s.global;
	
			// Uppercase the type
			s.type = s.type.toUpperCase();
	
			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );
	
			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
			}
	
			// More options handling for requests with no content
			if ( !s.hasContent ) {
	
				// If data is available, append data to url
				if ( s.data ) {
					s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}
	
				// Get ifModifiedKey before adding the anti-cache parameter
				ifModifiedKey = s.url;
	
				// Add anti-cache in url if needed
				if ( s.cache === false ) {
	
					var ts = jQuery.now(),
						// try replacing _= if it is there
						ret = s.url.replace( rts, "$1_=" + ts );
	
					// if nothing was replaced, add timestamp to the end
					s.url = ret + ( ( ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
				}
			}
	
			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}
	
			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				ifModifiedKey = ifModifiedKey || s.url;
				if ( jQuery.lastModified[ ifModifiedKey ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ ifModifiedKey ] );
				}
				if ( jQuery.etag[ ifModifiedKey ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ ifModifiedKey ] );
				}
			}
	
			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
					s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);
	
			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}
	
			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
					// Abort if not done already
					jqXHR.abort();
					return false;
	
			}
	
			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}
	
			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );
	
			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;
				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}
				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = setTimeout( function(){
						jqXHR.abort( "timeout" );
					}, s.timeout );
				}
	
				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch (e) {
					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );
					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}
	
			return jqXHR;
		},
	
		// Serialize an array of form elements or a set of
		// key/values into a query string
		param: function( a, traditional ) {
			var s = [],
				add = function( key, value ) {
					// If value is a function, invoke it and return its value
					value = jQuery.isFunction( value ) ? value() : value;
					s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
				};
	
			// Set traditional to true for jQuery <= 1.3.2 behavior.
			if ( traditional === undefined ) {
				traditional = jQuery.ajaxSettings.traditional;
			}
	
			// If an array was passed in, assume that it is an array of form elements.
			if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
				// Serialize the form elements
				jQuery.each( a, function() {
					add( this.name, this.value );
				});
	
			} else {
				// If traditional, encode the "old" way (the way 1.3.2 or older
				// did it), otherwise encode params recursively.
				for ( var prefix in a ) {
					buildParams( prefix, a[ prefix ], traditional, add );
				}
			}
	
			// Return the resulting serialization
			return s.join( "&" ).replace( r20, "+" );
		}
	});
	
	function buildParams( prefix, obj, traditional, add ) {
		if ( jQuery.isArray( obj ) ) {
			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {
					// Treat each array item as a scalar.
					add( prefix, v );
	
				} else {
					// If array item is non-scalar (array or object), encode its
					// numeric index to resolve deserialization ambiguity issues.
					// Note that rack (as of 1.0.0) can't currently deserialize
					// nested arrays properly, and attempting to do so may cause
					// a server error. Possible fixes are to modify rack's
					// deserialization algorithm or to provide an option or flag
					// to force array serialization to be shallow.
					buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
				}
			});
	
		} else if ( !traditional && jQuery.type( obj ) === "object" ) {
			// Serialize object item.
			for ( var name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}
	
		} else {
			// Serialize scalar item.
			add( prefix, obj );
		}
	}
	
	// This is still on the jQuery object... for now
	// Want to move this to jQuery.ajax some day
	jQuery.extend({
	
		// Counter for holding the number of active queries
		active: 0,
	
		// Last-Modified header cache for next request
		lastModified: {},
		etag: {}
	
	});
	
	/* Handles responses to an ajax request:
	 * - sets all responseXXX fields accordingly
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {
	
		var contents = s.contents,
			dataTypes = s.dataTypes,
			responseFields = s.responseFields,
			ct,
			type,
			finalDataType,
			firstDataType;
	
		// Fill responseXXX fields
		for ( type in responseFields ) {
			if ( type in responses ) {
				jqXHR[ responseFields[type] ] = responses[ type ];
			}
		}
	
		// Remove auto dataType and get content-type in the process
		while( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "content-type" );
			}
		}
	
		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}
	
		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {
			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}
			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}
	
		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}
	
	// Chain conversions given the request and the original response
	function ajaxConvert( s, response ) {
	
		// Apply the dataFilter if provided
		if ( s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}
	
		var dataTypes = s.dataTypes,
			converters = {},
			i,
			key,
			length = dataTypes.length,
			tmp,
			// Current and previous dataTypes
			current = dataTypes[ 0 ],
			prev,
			// Conversion expression
			conversion,
			// Conversion function
			conv,
			// Conversion functions (transitive conversion)
			conv1,
			conv2;
	
		// For each dataType in the chain
		for ( i = 1; i < length; i++ ) {
	
			// Create converters map
			// with lowercased keys
			if ( i === 1 ) {
				for ( key in s.converters ) {
					if ( typeof key === "string" ) {
						converters[ key.toLowerCase() ] = s.converters[ key ];
					}
				}
			}
	
			// Get the dataTypes
			prev = current;
			current = dataTypes[ i ];
	
			// If current is auto dataType, update it to prev
			if ( current === "*" ) {
				current = prev;
			// If no auto and dataTypes are actually different
			} else if ( prev !== "*" && prev !== current ) {
	
				// Get the converter
				conversion = prev + " " + current;
				conv = converters[ conversion ] || converters[ "* " + current ];
	
				// If there is no direct converter, search transitively
				if ( !conv ) {
					conv2 = undefined;
					for ( conv1 in converters ) {
						tmp = conv1.split( " " );
						if ( tmp[ 0 ] === prev || tmp[ 0 ] === "*" ) {
							conv2 = converters[ tmp[1] + " " + current ];
							if ( conv2 ) {
								conv1 = converters[ conv1 ];
								if ( conv1 === true ) {
									conv = conv2;
								} else if ( conv2 === true ) {
									conv = conv1;
								}
								break;
							}
						}
					}
				}
				// If we found no converter, dispatch an error
				if ( !( conv || conv2 ) ) {
					jQuery.error( "No conversion from " + conversion.replace(" "," to ") );
				}
				// If found converter is not an equivalence
				if ( conv !== true ) {
					// Convert with 1 or 2 converters accordingly
					response = conv ? conv( response ) : conv2( conv1(response) );
				}
			}
		}
		return response;
	}
	
	
	
	
	var jsc = jQuery.now(),
		jsre = /(\=)\?(&|$)|\?\?/i;
	
	// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			return jQuery.expando + "_" + ( jsc++ );
		}
	});
	
	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {
	
		var inspectData = ( typeof s.data === "string" ) && /^application\/x\-www\-form\-urlencoded/.test( s.contentType );
	
		if ( s.dataTypes[ 0 ] === "jsonp" ||
			s.jsonp !== false && ( jsre.test( s.url ) ||
					inspectData && jsre.test( s.data ) ) ) {
	
			var responseContainer,
				jsonpCallback = s.jsonpCallback =
					jQuery.isFunction( s.jsonpCallback ) ? s.jsonpCallback() : s.jsonpCallback,
				previous = window[ jsonpCallback ],
				url = s.url,
				data = s.data,
				replace = "$1" + jsonpCallback + "$2";
	
			if ( s.jsonp !== false ) {
				url = url.replace( jsre, replace );
				if ( s.url === url ) {
					if ( inspectData ) {
						data = data.replace( jsre, replace );
					}
					if ( s.data === data ) {
						// Add callback manually
						url += (/\?/.test( url ) ? "&" : "?") + s.jsonp + "=" + jsonpCallback;
					}
				}
			}
	
			s.url = url;
			s.data = data;
	
			// Install callback
			window[ jsonpCallback ] = function( response ) {
				responseContainer = [ response ];
			};
	
			// Clean-up function
			jqXHR.always(function() {
				// Set callback back to previous value
				window[ jsonpCallback ] = previous;
				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( previous ) ) {
					window[ jsonpCallback ]( responseContainer[ 0 ] );
				}
			});
	
			// Use data converter to retrieve json after script execution
			s.converters["script json"] = function() {
				if ( !responseContainer ) {
					jQuery.error( jsonpCallback + " was not called" );
				}
				return responseContainer[ 0 ];
			};
	
			// force json dataType
			s.dataTypes[ 0 ] = "json";
	
			// Delegate to script
			return "script";
		}
	});
	
	
	
	
	// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /javascript|ecmascript/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	});
	
	// Handle cache's special case and global
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
			s.global = false;
		}
	});
	
	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function(s) {
	
		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
	
			var script,
				head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;
	
			return {
	
				send: function( _, callback ) {
	
					script = document.createElement( "script" );
	
					script.async = "async";
	
					if ( s.scriptCharset ) {
						script.charset = s.scriptCharset;
					}
	
					script.src = s.url;
	
					// Attach handlers for all browsers
					script.onload = script.onreadystatechange = function( _, isAbort ) {
	
						if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {
	
							// Handle memory leak in IE
							script.onload = script.onreadystatechange = null;
	
							// Remove the script
							if ( head && script.parentNode ) {
								head.removeChild( script );
							}
	
							// Dereference the script
							script = undefined;
	
							// Callback if not abort
							if ( !isAbort ) {
								callback( 200, "success" );
							}
						}
					};
					// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
					// This arises when a base node is used (#2709 and #4378).
					head.insertBefore( script, head.firstChild );
				},
	
				abort: function() {
					if ( script ) {
						script.onload( 0, 1 );
					}
				}
			};
		}
	});
	
	
	
	
	var // #5280: Internet Explorer will keep connections alive if we don't abort on unload
		xhrOnUnloadAbort = window.ActiveXObject ? function() {
			// Abort all pending requests
			for ( var key in xhrCallbacks ) {
				xhrCallbacks[ key ]( 0, 1 );
			}
		} : false,
		xhrId = 0,
		xhrCallbacks;
	
	// Functions to create xhrs
	function createStandardXHR() {
		try {
			return new window.XMLHttpRequest();
		} catch( e ) {}
	}
	
	function createActiveXHR() {
		try {
			return new window.ActiveXObject( "Microsoft.XMLHTTP" );
		} catch( e ) {}
	}
	
	// Create the request object
	// (This is still attached to ajaxSettings for backward compatibility)
	jQuery.ajaxSettings.xhr = window.ActiveXObject ?
		/* Microsoft failed to properly
		 * implement the XMLHttpRequest in IE7 (can't request local files),
		 * so we use the ActiveXObject when it is available
		 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
		 * we need a fallback.
		 */
		function() {
			return !this.isLocal && createStandardXHR() || createActiveXHR();
		} :
		// For all other browsers, use the standard XMLHttpRequest object
		createStandardXHR;
	
	// Determine support properties
	(function( xhr ) {
		jQuery.extend( jQuery.support, {
			ajax: !!xhr,
			cors: !!xhr && ( "withCredentials" in xhr )
		});
	})( jQuery.ajaxSettings.xhr() );
	
	// Create transport if the browser can provide an xhr
	if ( jQuery.support.ajax ) {
	
		jQuery.ajaxTransport(function( s ) {
			// Cross domain only allowed if supported through XMLHttpRequest
			if ( !s.crossDomain || jQuery.support.cors ) {
	
				var callback;
	
				return {
					send: function( headers, complete ) {
	
						// Get a new xhr
						var xhr = s.xhr(),
							handle,
							i;
	
						// Open the socket
						// Passing null username, generates a login popup on Opera (#2865)
						if ( s.username ) {
							xhr.open( s.type, s.url, s.async, s.username, s.password );
						} else {
							xhr.open( s.type, s.url, s.async );
						}
	
						// Apply custom fields if provided
						if ( s.xhrFields ) {
							for ( i in s.xhrFields ) {
								xhr[ i ] = s.xhrFields[ i ];
							}
						}
	
						// Override mime type if needed
						if ( s.mimeType && xhr.overrideMimeType ) {
							xhr.overrideMimeType( s.mimeType );
						}
	
						// X-Requested-With header
						// For cross-domain requests, seeing as conditions for a preflight are
						// akin to a jigsaw puzzle, we simply never set it to be sure.
						// (it can always be set on a per-request basis or even using ajaxSetup)
						// For same-domain requests, won't change header if already provided.
						if ( !s.crossDomain && !headers["X-Requested-With"] ) {
							headers[ "X-Requested-With" ] = "XMLHttpRequest";
						}
	
						// Need an extra try/catch for cross domain requests in Firefox 3
						try {
							for ( i in headers ) {
								xhr.setRequestHeader( i, headers[ i ] );
							}
						} catch( _ ) {}
	
						// Do send the request
						// This may raise an exception which is actually
						// handled in jQuery.ajax (so no try/catch here)
						xhr.send( ( s.hasContent && s.data ) || null );
	
						// Listener
						callback = function( _, isAbort ) {
	
							var status,
								statusText,
								responseHeaders,
								responses,
								xml;
	
							// Firefox throws exceptions when accessing properties
							// of an xhr when a network error occured
							// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
							try {
	
								// Was never called and is aborted or complete
								if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
	
									// Only called once
									callback = undefined;
	
									// Do not keep as active anymore
									if ( handle ) {
										xhr.onreadystatechange = jQuery.noop;
										if ( xhrOnUnloadAbort ) {
											delete xhrCallbacks[ handle ];
										}
									}
	
									// If it's an abort
									if ( isAbort ) {
										// Abort it manually if needed
										if ( xhr.readyState !== 4 ) {
											xhr.abort();
										}
									} else {
										status = xhr.status;
										responseHeaders = xhr.getAllResponseHeaders();
										responses = {};
										xml = xhr.responseXML;
	
										// Construct response list
										if ( xml && xml.documentElement /* #4958 */ ) {
											responses.xml = xml;
										}
	
										// When requesting binary data, IE6-9 will throw an exception
										// on any attempt to access responseText (#11426)
										try {
											responses.text = xhr.responseText;
										} catch( _ ) {
										}
	
										// Firefox throws an exception when accessing
										// statusText for faulty cross-domain requests
										try {
											statusText = xhr.statusText;
										} catch( e ) {
											// We normalize with Webkit giving an empty statusText
											statusText = "";
										}
	
										// Filter status for non standard behaviors
	
										// If the request is local and we have data: assume a success
										// (success with no data won't get notified, that's the best we
										// can do given current implementations)
										if ( !status && s.isLocal && !s.crossDomain ) {
											status = responses.text ? 200 : 404;
										// IE - #1450: sometimes returns 1223 when it should be 204
										} else if ( status === 1223 ) {
											status = 204;
										}
									}
								}
							} catch( firefoxAccessException ) {
								if ( !isAbort ) {
									complete( -1, firefoxAccessException );
								}
							}
	
							// Call complete if needed
							if ( responses ) {
								complete( status, statusText, responses, responseHeaders );
							}
						};
	
						// if we're in sync mode or it's in cache
						// and has been retrieved directly (IE6 & IE7)
						// we need to manually fire the callback
						if ( !s.async || xhr.readyState === 4 ) {
							callback();
						} else {
							handle = ++xhrId;
							if ( xhrOnUnloadAbort ) {
								// Create the active xhrs callbacks list if needed
								// and attach the unload handler
								if ( !xhrCallbacks ) {
									xhrCallbacks = {};
									jQuery( window ).unload( xhrOnUnloadAbort );
								}
								// Add to list of active xhrs callbacks
								xhrCallbacks[ handle ] = callback;
							}
							xhr.onreadystatechange = callback;
						}
					},
	
					abort: function() {
						if ( callback ) {
							callback(0,1);
						}
					}
				};
			}
		});
	}
	
	
	
	
	var elemdisplay = {},
		iframe, iframeDoc,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rfxnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
		timerId,
		fxAttrs = [
			// height animations
			[ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ],
			// width animations
			[ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ],
			// opacity animations
			[ "opacity" ]
		],
		fxNow;
	
	jQuery.fn.extend({
		show: function( speed, easing, callback ) {
			var elem, display;
	
			if ( speed || speed === 0 ) {
				return this.animate( genFx("show", 3), speed, easing, callback );
	
			} else {
				for ( var i = 0, j = this.length; i < j; i++ ) {
					elem = this[ i ];
	
					if ( elem.style ) {
						display = elem.style.display;
	
						// Reset the inline display of this element to learn if it is
						// being hidden by cascaded rules or not
						if ( !jQuery._data(elem, "olddisplay") && display === "none" ) {
							display = elem.style.display = "";
						}
	
						// Set elements which have been overridden with display: none
						// in a stylesheet to whatever the default browser style is
						// for such an element
						if ( (display === "" && jQuery.css(elem, "display") === "none") ||
							!jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {
							jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
						}
					}
				}
	
				// Set the display of most of the elements in a second loop
				// to avoid the constant reflow
				for ( i = 0; i < j; i++ ) {
					elem = this[ i ];
	
					if ( elem.style ) {
						display = elem.style.display;
	
						if ( display === "" || display === "none" ) {
							elem.style.display = jQuery._data( elem, "olddisplay" ) || "";
						}
					}
				}
	
				return this;
			}
		},
	
		hide: function( speed, easing, callback ) {
			if ( speed || speed === 0 ) {
				return this.animate( genFx("hide", 3), speed, easing, callback);
	
			} else {
				var elem, display,
					i = 0,
					j = this.length;
	
				for ( ; i < j; i++ ) {
					elem = this[i];
					if ( elem.style ) {
						display = jQuery.css( elem, "display" );
	
						if ( display !== "none" && !jQuery._data( elem, "olddisplay" ) ) {
							jQuery._data( elem, "olddisplay", display );
						}
					}
				}
	
				// Set the display of the elements in a second loop
				// to avoid the constant reflow
				for ( i = 0; i < j; i++ ) {
					if ( this[i].style ) {
						this[i].style.display = "none";
					}
				}
	
				return this;
			}
		},
	
		// Save the old toggle function
		_toggle: jQuery.fn.toggle,
	
		toggle: function( fn, fn2, callback ) {
			var bool = typeof fn === "boolean";
	
			if ( jQuery.isFunction(fn) && jQuery.isFunction(fn2) ) {
				this._toggle.apply( this, arguments );
	
			} else if ( fn == null || bool ) {
				this.each(function() {
					var state = bool ? fn : jQuery(this).is(":hidden");
					jQuery(this)[ state ? "show" : "hide" ]();
				});
	
			} else {
				this.animate(genFx("toggle", 3), fn, fn2, callback);
			}
	
			return this;
		},
	
		fadeTo: function( speed, to, easing, callback ) {
			return this.filter(":hidden").css("opacity", 0).show().end()
						.animate({opacity: to}, speed, easing, callback);
		},
	
		animate: function( prop, speed, easing, callback ) {
			var optall = jQuery.speed( speed, easing, callback );
	
			if ( jQuery.isEmptyObject( prop ) ) {
				return this.each( optall.complete, [ false ] );
			}
	
			// Do not change referenced properties as per-property easing will be lost
			prop = jQuery.extend( {}, prop );
	
			function doAnimation() {
				// XXX 'this' does not always have a nodeName when running the
				// test suite
	
				if ( optall.queue === false ) {
					jQuery._mark( this );
				}
	
				var opt = jQuery.extend( {}, optall ),
					isElement = this.nodeType === 1,
					hidden = isElement && jQuery(this).is(":hidden"),
					name, val, p, e, hooks, replace,
					parts, start, end, unit,
					method;
	
				// will store per property easing and be used to determine when an animation is complete
				opt.animatedProperties = {};
	
				// first pass over propertys to expand / normalize
				for ( p in prop ) {
					name = jQuery.camelCase( p );
					if ( p !== name ) {
						prop[ name ] = prop[ p ];
						delete prop[ p ];
					}
	
					if ( ( hooks = jQuery.cssHooks[ name ] ) && "expand" in hooks ) {
						replace = hooks.expand( prop[ name ] );
						delete prop[ name ];
	
						// not quite $.extend, this wont overwrite keys already present.
						// also - reusing 'p' from above because we have the correct "name"
						for ( p in replace ) {
							if ( ! ( p in prop ) ) {
								prop[ p ] = replace[ p ];
							}
						}
					}
				}
	
				for ( name in prop ) {
					val = prop[ name ];
					// easing resolution: per property > opt.specialEasing > opt.easing > 'swing' (default)
					if ( jQuery.isArray( val ) ) {
						opt.animatedProperties[ name ] = val[ 1 ];
						val = prop[ name ] = val[ 0 ];
					} else {
						opt.animatedProperties[ name ] = opt.specialEasing && opt.specialEasing[ name ] || opt.easing || 'swing';
					}
	
					if ( val === "hide" && hidden || val === "show" && !hidden ) {
						return opt.complete.call( this );
					}
	
					if ( isElement && ( name === "height" || name === "width" ) ) {
						// Make sure that nothing sneaks out
						// Record all 3 overflow attributes because IE does not
						// change the overflow attribute when overflowX and
						// overflowY are set to the same value
						opt.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ];
	
						// Set display property to inline-block for height/width
						// animations on inline elements that are having width/height animated
						if ( jQuery.css( this, "display" ) === "inline" &&
								jQuery.css( this, "float" ) === "none" ) {
	
							// inline-level elements accept inline-block;
							// block-level elements need to be inline with layout
							if ( !jQuery.support.inlineBlockNeedsLayout || defaultDisplay( this.nodeName ) === "inline" ) {
								this.style.display = "inline-block";
	
							} else {
								this.style.zoom = 1;
							}
						}
					}
				}
	
				if ( opt.overflow != null ) {
					this.style.overflow = "hidden";
				}
	
				for ( p in prop ) {
					e = new jQuery.fx( this, opt, p );
					val = prop[ p ];
	
					if ( rfxtypes.test( val ) ) {
	
						// Tracks whether to show or hide based on private
						// data attached to the element
						method = jQuery._data( this, "toggle" + p ) || ( val === "toggle" ? hidden ? "show" : "hide" : 0 );
						if ( method ) {
							jQuery._data( this, "toggle" + p, method === "show" ? "hide" : "show" );
							e[ method ]();
						} else {
							e[ val ]();
						}
	
					} else {
						parts = rfxnum.exec( val );
						start = e.cur();
	
						if ( parts ) {
							end = parseFloat( parts[2] );
							unit = parts[3] || ( jQuery.cssNumber[ p ] ? "" : "px" );
	
							// We need to compute starting value
							if ( unit !== "px" ) {
								jQuery.style( this, p, (end || 1) + unit);
								start = ( (end || 1) / e.cur() ) * start;
								jQuery.style( this, p, start + unit);
							}
	
							// If a +=/-= token was provided, we're doing a relative animation
							if ( parts[1] ) {
								end = ( (parts[ 1 ] === "-=" ? -1 : 1) * end ) + start;
							}
	
							e.custom( start, end, unit );
	
						} else {
							e.custom( start, val, "" );
						}
					}
				}
	
				// For JS strict compliance
				return true;
			}
	
			return optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
	
		stop: function( type, clearQueue, gotoEnd ) {
			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}
	
			return this.each(function() {
				var index,
					hadTimers = false,
					timers = jQuery.timers,
					data = jQuery._data( this );
	
				// clear marker counters if we know they won't be
				if ( !gotoEnd ) {
					jQuery._unmark( true, this );
				}
	
				function stopQueue( elem, data, index ) {
					var hooks = data[ index ];
					jQuery.removeData( elem, index, true );
					hooks.stop( gotoEnd );
				}
	
				if ( type == null ) {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && index.indexOf(".run") === index.length - 4 ) {
							stopQueue( this, data, index );
						}
					}
				} else if ( data[ index = type + ".run" ] && data[ index ].stop ){
					stopQueue( this, data, index );
				}
	
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
						if ( gotoEnd ) {
	
							// force the next step to be the last
							timers[ index ]( true );
						} else {
							timers[ index ].saveState();
						}
						hadTimers = true;
						timers.splice( index, 1 );
					}
				}
	
				// start the next in the queue if the last step wasn't forced
				// timers currently will call their complete callbacks, which will dequeue
				// but only if they were gotoEnd
				if ( !( gotoEnd && hadTimers ) ) {
					jQuery.dequeue( this, type );
				}
			});
		}
	
	});
	
	// Animations created synchronously will run synchronously
	function createFxNow() {
		setTimeout( clearFxNow, 0 );
		return ( fxNow = jQuery.now() );
	}
	
	function clearFxNow() {
		fxNow = undefined;
	}
	
	// Generate parameters to create a standard animation
	function genFx( type, num ) {
		var obj = {};
	
		jQuery.each( fxAttrs.concat.apply([], fxAttrs.slice( 0, num )), function() {
			obj[ this ] = type;
		});
	
		return obj;
	}
	
	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx( "show", 1 ),
		slideUp: genFx( "hide", 1 ),
		slideToggle: genFx( "toggle", 1 ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	});
	
	jQuery.extend({
		speed: function( speed, easing, fn ) {
			var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
				complete: fn || !fn && easing ||
					jQuery.isFunction( speed ) && speed,
				duration: speed,
				easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
			};
	
			opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
				opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;
	
			// normalize opt.queue - true/undefined/null -> "fx"
			if ( opt.queue == null || opt.queue === true ) {
				opt.queue = "fx";
			}
	
			// Queueing
			opt.old = opt.complete;
	
			opt.complete = function( noUnmark ) {
				if ( jQuery.isFunction( opt.old ) ) {
					opt.old.call( this );
				}
	
				if ( opt.queue ) {
					jQuery.dequeue( this, opt.queue );
				} else if ( noUnmark !== false ) {
					jQuery._unmark( this );
				}
			};
	
			return opt;
		},
	
		easing: {
			linear: function( p ) {
				return p;
			},
			swing: function( p ) {
				return ( -Math.cos( p*Math.PI ) / 2 ) + 0.5;
			}
		},
	
		timers: [],
	
		fx: function( elem, options, prop ) {
			this.options = options;
			this.elem = elem;
			this.prop = prop;
	
			options.orig = options.orig || {};
		}
	
	});
	
	jQuery.fx.prototype = {
		// Simple function for setting a style value
		update: function() {
			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}
	
			( jQuery.fx.step[ this.prop ] || jQuery.fx.step._default )( this );
		},
	
		// Get the current size
		cur: function() {
			if ( this.elem[ this.prop ] != null && (!this.elem.style || this.elem.style[ this.prop ] == null) ) {
				return this.elem[ this.prop ];
			}
	
			var parsed,
				r = jQuery.css( this.elem, this.prop );
			// Empty strings, null, undefined and "auto" are converted to 0,
			// complex values such as "rotate(1rad)" are returned as is,
			// simple values such as "10px" are parsed to Float.
			return isNaN( parsed = parseFloat( r ) ) ? !r || r === "auto" ? 0 : r : parsed;
		},
	
		// Start an animation from one number to another
		custom: function( from, to, unit ) {
			var self = this,
				fx = jQuery.fx;
	
			this.startTime = fxNow || createFxNow();
			this.end = to;
			this.now = this.start = from;
			this.pos = this.state = 0;
			this.unit = unit || this.unit || ( jQuery.cssNumber[ this.prop ] ? "" : "px" );
	
			function t( gotoEnd ) {
				return self.step( gotoEnd );
			}
	
			t.queue = this.options.queue;
			t.elem = this.elem;
			t.saveState = function() {
				if ( jQuery._data( self.elem, "fxshow" + self.prop ) === undefined ) {
					if ( self.options.hide ) {
						jQuery._data( self.elem, "fxshow" + self.prop, self.start );
					} else if ( self.options.show ) {
						jQuery._data( self.elem, "fxshow" + self.prop, self.end );
					}
				}
			};
	
			if ( t() && jQuery.timers.push(t) && !timerId ) {
				timerId = setInterval( fx.tick, fx.interval );
			}
		},
	
		// Simple 'show' function
		show: function() {
			var dataShow = jQuery._data( this.elem, "fxshow" + this.prop );
	
			// Remember where we started, so that we can go back to it later
			this.options.orig[ this.prop ] = dataShow || jQuery.style( this.elem, this.prop );
			this.options.show = true;
	
			// Begin the animation
			// Make sure that we start at a small width/height to avoid any flash of content
			if ( dataShow !== undefined ) {
				// This show is picking up where a previous hide or show left off
				this.custom( this.cur(), dataShow );
			} else {
				this.custom( this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur() );
			}
	
			// Start by showing the element
			jQuery( this.elem ).show();
		},
	
		// Simple 'hide' function
		hide: function() {
			// Remember where we started, so that we can go back to it later
			this.options.orig[ this.prop ] = jQuery._data( this.elem, "fxshow" + this.prop ) || jQuery.style( this.elem, this.prop );
			this.options.hide = true;
	
			// Begin the animation
			this.custom( this.cur(), 0 );
		},
	
		// Each step of an animation
		step: function( gotoEnd ) {
			var p, n, complete,
				t = fxNow || createFxNow(),
				done = true,
				elem = this.elem,
				options = this.options;
	
			if ( gotoEnd || t >= options.duration + this.startTime ) {
				this.now = this.end;
				this.pos = this.state = 1;
				this.update();
	
				options.animatedProperties[ this.prop ] = true;
	
				for ( p in options.animatedProperties ) {
					if ( options.animatedProperties[ p ] !== true ) {
						done = false;
					}
				}
	
				if ( done ) {
					// Reset the overflow
					if ( options.overflow != null && !jQuery.support.shrinkWrapBlocks ) {
	
						jQuery.each( [ "", "X", "Y" ], function( index, value ) {
							elem.style[ "overflow" + value ] = options.overflow[ index ];
						});
					}
	
					// Hide the element if the "hide" operation was done
					if ( options.hide ) {
						jQuery( elem ).hide();
					}
	
					// Reset the properties, if the item has been hidden or shown
					if ( options.hide || options.show ) {
						for ( p in options.animatedProperties ) {
							jQuery.style( elem, p, options.orig[ p ] );
							jQuery.removeData( elem, "fxshow" + p, true );
							// Toggle data is no longer needed
							jQuery.removeData( elem, "toggle" + p, true );
						}
					}
	
					// Execute the complete function
					// in the event that the complete function throws an exception
					// we must ensure it won't be called twice. #5684
	
					complete = options.complete;
					if ( complete ) {
	
						options.complete = false;
						complete.call( elem );
					}
				}
	
				return false;
	
			} else {
				// classical easing cannot be used with an Infinity duration
				if ( options.duration == Infinity ) {
					this.now = t;
				} else {
					n = t - this.startTime;
					this.state = n / options.duration;
	
					// Perform the easing function, defaults to swing
					this.pos = jQuery.easing[ options.animatedProperties[this.prop] ]( this.state, n, 0, 1, options.duration );
					this.now = this.start + ( (this.end - this.start) * this.pos );
				}
				// Perform the next step of the animation
				this.update();
			}
	
			return true;
		}
	};
	
	jQuery.extend( jQuery.fx, {
		tick: function() {
			var timer,
				timers = jQuery.timers,
				i = 0;
	
			for ( ; i < timers.length; i++ ) {
				timer = timers[ i ];
				// Checks the timer has not already been removed
				if ( !timer() && timers[ i ] === timer ) {
					timers.splice( i--, 1 );
				}
			}
	
			if ( !timers.length ) {
				jQuery.fx.stop();
			}
		},
	
		interval: 13,
	
		stop: function() {
			clearInterval( timerId );
			timerId = null;
		},
	
		speeds: {
			slow: 600,
			fast: 200,
			// Default speed
			_default: 400
		},
	
		step: {
			opacity: function( fx ) {
				jQuery.style( fx.elem, "opacity", fx.now );
			},
	
			_default: function( fx ) {
				if ( fx.elem.style && fx.elem.style[ fx.prop ] != null ) {
					fx.elem.style[ fx.prop ] = fx.now + fx.unit;
				} else {
					fx.elem[ fx.prop ] = fx.now;
				}
			}
		}
	});
	
	// Ensure props that can't be negative don't go there on undershoot easing
	jQuery.each( fxAttrs.concat.apply( [], fxAttrs ), function( i, prop ) {
		// exclude marginTop, marginLeft, marginBottom and marginRight from this list
		if ( prop.indexOf( "margin" ) ) {
			jQuery.fx.step[ prop ] = function( fx ) {
				jQuery.style( fx.elem, prop, Math.max(0, fx.now) + fx.unit );
			};
		}
	});
	
	if ( jQuery.expr && jQuery.expr.filters ) {
		jQuery.expr.filters.animated = function( elem ) {
			return jQuery.grep(jQuery.timers, function( fn ) {
				return elem === fn.elem;
			}).length;
		};
	}
	
	// Try to restore the default display value of an element
	function defaultDisplay( nodeName ) {
	
		if ( !elemdisplay[ nodeName ] ) {
	
			var body = document.body,
				elem = jQuery( "<" + nodeName + ">" ).appendTo( body ),
				display = elem.css( "display" );
			elem.remove();
	
			// If the simple way fails,
			// get element's real default display by attaching it to a temp iframe
			if ( display === "none" || display === "" ) {
				// No iframe to use yet, so create it
				if ( !iframe ) {
					iframe = document.createElement( "iframe" );
					iframe.frameBorder = iframe.width = iframe.height = 0;
				}
	
				body.appendChild( iframe );
	
				// Create a cacheable copy of the iframe document on first call.
				// IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
				// document to it; WebKit & Firefox won't allow reusing the iframe document.
				if ( !iframeDoc || !iframe.createElement ) {
					iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
					iframeDoc.write( ( jQuery.support.boxModel ? "<!doctype html>" : "" ) + "<html><body>" );
					iframeDoc.close();
				}
	
				elem = iframeDoc.createElement( nodeName );
	
				iframeDoc.body.appendChild( elem );
	
				display = jQuery.css( elem, "display" );
				body.removeChild( iframe );
			}
	
			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}
	
		return elemdisplay[ nodeName ];
	}
	
	
	
	
	var getOffset,
		rtable = /^t(?:able|d|h)$/i,
		rroot = /^(?:body|html)$/i;
	
	if ( "getBoundingClientRect" in document.documentElement ) {
		getOffset = function( elem, doc, docElem, box ) {
			try {
				box = elem.getBoundingClientRect();
			} catch(e) {}
	
			// Make sure we're not dealing with a disconnected DOM node
			if ( !box || !jQuery.contains( docElem, elem ) ) {
				return box ? { top: box.top, left: box.left } : { top: 0, left: 0 };
			}
	
			var body = doc.body,
				win = getWindow( doc ),
				clientTop  = docElem.clientTop  || body.clientTop  || 0,
				clientLeft = docElem.clientLeft || body.clientLeft || 0,
				scrollTop  = win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop  || body.scrollTop,
				scrollLeft = win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft,
				top  = box.top  + scrollTop  - clientTop,
				left = box.left + scrollLeft - clientLeft;
	
			return { top: top, left: left };
		};
	
	} else {
		getOffset = function( elem, doc, docElem ) {
			var computedStyle,
				offsetParent = elem.offsetParent,
				prevOffsetParent = elem,
				body = doc.body,
				defaultView = doc.defaultView,
				prevComputedStyle = defaultView ? defaultView.getComputedStyle( elem, null ) : elem.currentStyle,
				top = elem.offsetTop,
				left = elem.offsetLeft;
	
			while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
				if ( jQuery.support.fixedPosition && prevComputedStyle.position === "fixed" ) {
					break;
				}
	
				computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
				top  -= elem.scrollTop;
				left -= elem.scrollLeft;
	
				if ( elem === offsetParent ) {
					top  += elem.offsetTop;
					left += elem.offsetLeft;
	
					if ( jQuery.support.doesNotAddBorder && !(jQuery.support.doesAddBorderForTableAndCells && rtable.test(elem.nodeName)) ) {
						top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
						left += parseFloat( computedStyle.borderLeftWidth ) || 0;
					}
	
					prevOffsetParent = offsetParent;
					offsetParent = elem.offsetParent;
				}
	
				if ( jQuery.support.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" ) {
					top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
					left += parseFloat( computedStyle.borderLeftWidth ) || 0;
				}
	
				prevComputedStyle = computedStyle;
			}
	
			if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" ) {
				top  += body.offsetTop;
				left += body.offsetLeft;
			}
	
			if ( jQuery.support.fixedPosition && prevComputedStyle.position === "fixed" ) {
				top  += Math.max( docElem.scrollTop, body.scrollTop );
				left += Math.max( docElem.scrollLeft, body.scrollLeft );
			}
	
			return { top: top, left: left };
		};
	}
	
	jQuery.fn.offset = function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}
	
		var elem = this[0],
			doc = elem && elem.ownerDocument;
	
		if ( !doc ) {
			return null;
		}
	
		if ( elem === doc.body ) {
			return jQuery.offset.bodyOffset( elem );
		}
	
		return getOffset( elem, doc, doc.documentElement );
	};
	
	jQuery.offset = {
	
		bodyOffset: function( body ) {
			var top = body.offsetTop,
				left = body.offsetLeft;
	
			if ( jQuery.support.doesNotIncludeMarginInBodyOffset ) {
				top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
				left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
			}
	
			return { top: top, left: left };
		},
	
		setOffset: function( elem, options, i ) {
			var position = jQuery.css( elem, "position" );
	
			// set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}
	
			var curElem = jQuery( elem ),
				curOffset = curElem.offset(),
				curCSSTop = jQuery.css( elem, "top" ),
				curCSSLeft = jQuery.css( elem, "left" ),
				calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
				props = {}, curPosition = {}, curTop, curLeft;
	
			// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}
	
			if ( jQuery.isFunction( options ) ) {
				options = options.call( elem, i, curOffset );
			}
	
			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}
	
			if ( "using" in options ) {
				options.using.call( elem, props );
			} else {
				curElem.css( props );
			}
		}
	};
	
	
	jQuery.fn.extend({
	
		position: function() {
			if ( !this[0] ) {
				return null;
			}
	
			var elem = this[0],
	
			// Get *real* offsetParent
			offsetParent = this.offsetParent(),
	
			// Get correct offsets
			offset       = this.offset(),
			parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();
	
			// Subtract element margins
			// note: when an element has margin: auto the offsetLeft and marginLeft
			// are the same in Safari causing offset.left to incorrectly be 0
			offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
			offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;
	
			// Add offsetParent borders
			parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
			parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;
	
			// Subtract the two offsets
			return {
				top:  offset.top  - parentOffset.top,
				left: offset.left - parentOffset.left
			};
		},
	
		offsetParent: function() {
			return this.map(function() {
				var offsetParent = this.offsetParent || document.body;
				while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
					offsetParent = offsetParent.offsetParent;
				}
				return offsetParent;
			});
		}
	});
	
	
	// Create scrollLeft and scrollTop methods
	jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
		var top = /Y/.test( prop );
	
		jQuery.fn[ method ] = function( val ) {
			return jQuery.access( this, function( elem, method, val ) {
				var win = getWindow( elem );
	
				if ( val === undefined ) {
					return win ? (prop in win) ? win[ prop ] :
						jQuery.support.boxModel && win.document.documentElement[ method ] ||
							win.document.body[ method ] :
						elem[ method ];
				}
	
				if ( win ) {
					win.scrollTo(
						!top ? val : jQuery( win ).scrollLeft(),
						 top ? val : jQuery( win ).scrollTop()
					);
	
				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length, null );
		};
	});
	
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ?
			elem :
			elem.nodeType === 9 ?
				elem.defaultView || elem.parentWindow :
				false;
	}
	
	
	
	
	// Create width, height, innerHeight, innerWidth, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		var clientProp = "client" + name,
			scrollProp = "scroll" + name,
			offsetProp = "offset" + name;
	
		// innerHeight and innerWidth
		jQuery.fn[ "inner" + name ] = function() {
			var elem = this[0];
			return elem ?
				elem.style ?
				parseFloat( jQuery.css( elem, type, "padding" ) ) :
				this[ type ]() :
				null;
		};
	
		// outerHeight and outerWidth
		jQuery.fn[ "outer" + name ] = function( margin ) {
			var elem = this[0];
			return elem ?
				elem.style ?
				parseFloat( jQuery.css( elem, type, margin ? "margin" : "border" ) ) :
				this[ type ]() :
				null;
		};
	
		jQuery.fn[ type ] = function( value ) {
			return jQuery.access( this, function( elem, type, value ) {
				var doc, docElemProp, orig, ret;
	
				if ( jQuery.isWindow( elem ) ) {
					// 3rd condition allows Nokia support, as it supports the docElem prop but not CSS1Compat
					doc = elem.document;
					docElemProp = doc.documentElement[ clientProp ];
					return jQuery.support.boxModel && docElemProp ||
						doc.body && doc.body[ clientProp ] || docElemProp;
				}
	
				// Get document width or height
				if ( elem.nodeType === 9 ) {
					// Either scroll[Width/Height] or offset[Width/Height], whichever is greater
					doc = elem.documentElement;
	
					// when a window > document, IE6 reports a offset[Width/Height] > client[Width/Height]
					// so we can't use max, as it'll choose the incorrect offset[Width/Height]
					// instead we use the correct client[Width/Height]
					// support:IE6
					if ( doc[ clientProp ] >= doc[ scrollProp ] ) {
						return doc[ clientProp ];
					}
	
					return Math.max(
						elem.body[ scrollProp ], doc[ scrollProp ],
						elem.body[ offsetProp ], doc[ offsetProp ]
					);
				}
	
				// Get width or height on the element
				if ( value === undefined ) {
					orig = jQuery.css( elem, type );
					ret = parseFloat( orig );
					return jQuery.isNumeric( ret ) ? ret : orig;
				}
	
				// Set the width or height on the element
				jQuery( elem ).css( type, value );
			}, type, value, arguments.length, null );
		};
	});
	
	
	
	
	if ( typeof module === "object" && module && typeof module.exports === "object" ) {
		// Expose jQuery as module.exports in loaders that implement the Node
		// module pattern (including browserify). Do not create the global, since
		// the user will be storing it themselves locally, and globals are frowned
		// upon in the Node module world.
		module.exports = jQuery;
	} else {
		// Otherwise expose jQuery to the global object as usual
		window.jQuery = window.$ = jQuery;
	
		// Register as a named AMD module, since jQuery can be concatenated with other
		// files that may use define, but not via a proper concatenation script that
		// understands anonymous AMD modules. A named AMD is safest and most robust
		// way to register. Lowercase jquery is used because AMD module names are
		// derived from file names, and jQuery is normally delivered in a lowercase
		// file name. Do this after creating the global so that if an AMD module wants
		// to call noConflict to hide this version of jQuery, it will work.
		if ( true ) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () { return jQuery; }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		}
	}
	
	
	
	})( window );
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(43)(module)))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Utils = __webpack_require__(5);
	var Exception = __webpack_require__(3)["default"];
	
	var VERSION = "1.3.0";
	exports.VERSION = VERSION;var COMPILER_REVISION = 4;
	exports.COMPILER_REVISION = COMPILER_REVISION;
	var REVISION_CHANGES = {
	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	  2: '== 1.0.0-rc.3',
	  3: '== 1.0.0-rc.4',
	  4: '>= 1.0.0'
	};
	exports.REVISION_CHANGES = REVISION_CHANGES;
	var isArray = Utils.isArray,
	    isFunction = Utils.isFunction,
	    toString = Utils.toString,
	    objectType = '[object Object]';
	
	function HandlebarsEnvironment(helpers, partials) {
	  this.helpers = helpers || {};
	  this.partials = partials || {};
	
	  registerDefaultHelpers(this);
	}
	
	exports.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
	  constructor: HandlebarsEnvironment,
	
	  logger: logger,
	  log: log,
	
	  registerHelper: function(name, fn, inverse) {
	    if (toString.call(name) === objectType) {
	      if (inverse || fn) { throw new Exception('Arg not supported with multiple helpers'); }
	      Utils.extend(this.helpers, name);
	    } else {
	      if (inverse) { fn.not = inverse; }
	      this.helpers[name] = fn;
	    }
	  },
	
	  registerPartial: function(name, str) {
	    if (toString.call(name) === objectType) {
	      Utils.extend(this.partials,  name);
	    } else {
	      this.partials[name] = str;
	    }
	  }
	};
	
	function registerDefaultHelpers(instance) {
	  instance.registerHelper('helperMissing', function(arg) {
	    if(arguments.length === 2) {
	      return undefined;
	    } else {
	      throw new Exception("Missing helper: '" + arg + "'");
	    }
	  });
	
	  instance.registerHelper('blockHelperMissing', function(context, options) {
	    var inverse = options.inverse || function() {}, fn = options.fn;
	
	    if (isFunction(context)) { context = context.call(this); }
	
	    if(context === true) {
	      return fn(this);
	    } else if(context === false || context == null) {
	      return inverse(this);
	    } else if (isArray(context)) {
	      if(context.length > 0) {
	        return instance.helpers.each(context, options);
	      } else {
	        return inverse(this);
	      }
	    } else {
	      return fn(context);
	    }
	  });
	
	  instance.registerHelper('each', function(context, options) {
	    var fn = options.fn, inverse = options.inverse;
	    var i = 0, ret = "", data;
	
	    if (isFunction(context)) { context = context.call(this); }
	
	    if (options.data) {
	      data = createFrame(options.data);
	    }
	
	    if(context && typeof context === 'object') {
	      if (isArray(context)) {
	        for(var j = context.length; i<j; i++) {
	          if (data) {
	            data.index = i;
	            data.first = (i === 0);
	            data.last  = (i === (context.length-1));
	          }
	          ret = ret + fn(context[i], { data: data });
	        }
	      } else {
	        for(var key in context) {
	          if(context.hasOwnProperty(key)) {
	            if(data) { 
	              data.key = key; 
	              data.index = i;
	              data.first = (i === 0);
	            }
	            ret = ret + fn(context[key], {data: data});
	            i++;
	          }
	        }
	      }
	    }
	
	    if(i === 0){
	      ret = inverse(this);
	    }
	
	    return ret;
	  });
	
	  instance.registerHelper('if', function(conditional, options) {
	    if (isFunction(conditional)) { conditional = conditional.call(this); }
	
	    // Default behavior is to render the positive path if the value is truthy and not empty.
	    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
	    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
	    if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
	      return options.inverse(this);
	    } else {
	      return options.fn(this);
	    }
	  });
	
	  instance.registerHelper('unless', function(conditional, options) {
	    return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
	  });
	
	  instance.registerHelper('with', function(context, options) {
	    if (isFunction(context)) { context = context.call(this); }
	
	    if (!Utils.isEmpty(context)) return options.fn(context);
	  });
	
	  instance.registerHelper('log', function(context, options) {
	    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
	    instance.log(level, context);
	  });
	}
	
	var logger = {
	  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },
	
	  // State enum
	  DEBUG: 0,
	  INFO: 1,
	  WARN: 2,
	  ERROR: 3,
	  level: 3,
	
	  // can be overridden in the host environment
	  log: function(level, obj) {
	    if (logger.level <= level) {
	      var method = logger.methodMap[level];
	      if (typeof console !== 'undefined' && console[method]) {
	        console[method].call(console, obj);
	      }
	    }
	  }
	};
	exports.logger = logger;
	function log(level, obj) { logger.log(level, obj); }
	
	exports.log = log;var createFrame = function(object) {
	  var obj = {};
	  Utils.extend(obj, object);
	  return obj;
	};
	exports.createFrame = createFrame;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];
	
	function Exception(message, node) {
	  var line;
	  if (node && node.firstLine) {
	    line = node.firstLine;
	
	    message += ' - ' + line + ':' + node.firstColumn;
	  }
	
	  var tmp = Error.prototype.constructor.call(this, message);
	
	  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
	  for (var idx = 0; idx < errorProps.length; idx++) {
	    this[errorProps[idx]] = tmp[errorProps[idx]];
	  }
	
	  if (line) {
	    this.lineNumber = line;
	    this.column = node.firstColumn;
	  }
	}
	
	Exception.prototype = new Error();
	
	exports["default"] = Exception;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Exception = __webpack_require__(3)["default"];
	
	function Compiler() {}
	
	exports.Compiler = Compiler;// the foundHelper register will disambiguate helper lookup from finding a
	// function in a context. This is necessary for mustache compatibility, which
	// requires that context functions in blocks are evaluated by blockHelperMissing,
	// and then proceed as if the resulting value was provided to blockHelperMissing.
	
	Compiler.prototype = {
	  compiler: Compiler,
	
	  disassemble: function() {
	    var opcodes = this.opcodes, opcode, out = [], params, param;
	
	    for (var i=0, l=opcodes.length; i<l; i++) {
	      opcode = opcodes[i];
	
	      if (opcode.opcode === 'DECLARE') {
	        out.push("DECLARE " + opcode.name + "=" + opcode.value);
	      } else {
	        params = [];
	        for (var j=0; j<opcode.args.length; j++) {
	          param = opcode.args[j];
	          if (typeof param === "string") {
	            param = "\"" + param.replace("\n", "\\n") + "\"";
	          }
	          params.push(param);
	        }
	        out.push(opcode.opcode + " " + params.join(" "));
	      }
	    }
	
	    return out.join("\n");
	  },
	
	  equals: function(other) {
	    var len = this.opcodes.length;
	    if (other.opcodes.length !== len) {
	      return false;
	    }
	
	    for (var i = 0; i < len; i++) {
	      var opcode = this.opcodes[i],
	          otherOpcode = other.opcodes[i];
	      if (opcode.opcode !== otherOpcode.opcode || opcode.args.length !== otherOpcode.args.length) {
	        return false;
	      }
	      for (var j = 0; j < opcode.args.length; j++) {
	        if (opcode.args[j] !== otherOpcode.args[j]) {
	          return false;
	        }
	      }
	    }
	
	    len = this.children.length;
	    if (other.children.length !== len) {
	      return false;
	    }
	    for (i = 0; i < len; i++) {
	      if (!this.children[i].equals(other.children[i])) {
	        return false;
	      }
	    }
	
	    return true;
	  },
	
	  guid: 0,
	
	  compile: function(program, options) {
	    this.opcodes = [];
	    this.children = [];
	    this.depths = {list: []};
	    this.options = options;
	
	    // These changes will propagate to the other compiler components
	    var knownHelpers = this.options.knownHelpers;
	    this.options.knownHelpers = {
	      'helperMissing': true,
	      'blockHelperMissing': true,
	      'each': true,
	      'if': true,
	      'unless': true,
	      'with': true,
	      'log': true
	    };
	    if (knownHelpers) {
	      for (var name in knownHelpers) {
	        this.options.knownHelpers[name] = knownHelpers[name];
	      }
	    }
	
	    return this.accept(program);
	  },
	
	  accept: function(node) {
	    var strip = node.strip || {},
	        ret;
	    if (strip.left) {
	      this.opcode('strip');
	    }
	
	    ret = this[node.type](node);
	
	    if (strip.right) {
	      this.opcode('strip');
	    }
	
	    return ret;
	  },
	
	  program: function(program) {
	    var statements = program.statements;
	
	    for(var i=0, l=statements.length; i<l; i++) {
	      this.accept(statements[i]);
	    }
	    this.isSimple = l === 1;
	
	    this.depths.list = this.depths.list.sort(function(a, b) {
	      return a - b;
	    });
	
	    return this;
	  },
	
	  compileProgram: function(program) {
	    var result = new this.compiler().compile(program, this.options);
	    var guid = this.guid++, depth;
	
	    this.usePartial = this.usePartial || result.usePartial;
	
	    this.children[guid] = result;
	
	    for(var i=0, l=result.depths.list.length; i<l; i++) {
	      depth = result.depths.list[i];
	
	      if(depth < 2) { continue; }
	      else { this.addDepth(depth - 1); }
	    }
	
	    return guid;
	  },
	
	  block: function(block) {
	    var mustache = block.mustache,
	        program = block.program,
	        inverse = block.inverse;
	
	    if (program) {
	      program = this.compileProgram(program);
	    }
	
	    if (inverse) {
	      inverse = this.compileProgram(inverse);
	    }
	
	    var sexpr = mustache.sexpr;
	    var type = this.classifySexpr(sexpr);
	
	    if (type === "helper") {
	      this.helperSexpr(sexpr, program, inverse);
	    } else if (type === "simple") {
	      this.simpleSexpr(sexpr);
	
	      // now that the simple mustache is resolved, we need to
	      // evaluate it by executing `blockHelperMissing`
	      this.opcode('pushProgram', program);
	      this.opcode('pushProgram', inverse);
	      this.opcode('emptyHash');
	      this.opcode('blockValue');
	    } else {
	      this.ambiguousSexpr(sexpr, program, inverse);
	
	      // now that the simple mustache is resolved, we need to
	      // evaluate it by executing `blockHelperMissing`
	      this.opcode('pushProgram', program);
	      this.opcode('pushProgram', inverse);
	      this.opcode('emptyHash');
	      this.opcode('ambiguousBlockValue');
	    }
	
	    this.opcode('append');
	  },
	
	  hash: function(hash) {
	    var pairs = hash.pairs, pair, val;
	
	    this.opcode('pushHash');
	
	    for(var i=0, l=pairs.length; i<l; i++) {
	      pair = pairs[i];
	      val  = pair[1];
	
	      if (this.options.stringParams) {
	        if(val.depth) {
	          this.addDepth(val.depth);
	        }
	        this.opcode('getContext', val.depth || 0);
	        this.opcode('pushStringParam', val.stringModeValue, val.type);
	
	        if (val.type === 'sexpr') {
	          // Subexpressions get evaluated and passed in
	          // in string params mode.
	          this.sexpr(val);
	        }
	      } else {
	        this.accept(val);
	      }
	
	      this.opcode('assignToHash', pair[0]);
	    }
	    this.opcode('popHash');
	  },
	
	  partial: function(partial) {
	    var partialName = partial.partialName;
	    this.usePartial = true;
	
	    if(partial.context) {
	      this.ID(partial.context);
	    } else {
	      this.opcode('push', 'depth0');
	    }
	
	    this.opcode('invokePartial', partialName.name);
	    this.opcode('append');
	  },
	
	  content: function(content) {
	    this.opcode('appendContent', content.string);
	  },
	
	  mustache: function(mustache) {
	    this.sexpr(mustache.sexpr);
	
	    if(mustache.escaped && !this.options.noEscape) {
	      this.opcode('appendEscaped');
	    } else {
	      this.opcode('append');
	    }
	  },
	
	  ambiguousSexpr: function(sexpr, program, inverse) {
	    var id = sexpr.id,
	        name = id.parts[0],
	        isBlock = program != null || inverse != null;
	
	    this.opcode('getContext', id.depth);
	
	    this.opcode('pushProgram', program);
	    this.opcode('pushProgram', inverse);
	
	    this.opcode('invokeAmbiguous', name, isBlock);
	  },
	
	  simpleSexpr: function(sexpr) {
	    var id = sexpr.id;
	
	    if (id.type === 'DATA') {
	      this.DATA(id);
	    } else if (id.parts.length) {
	      this.ID(id);
	    } else {
	      // Simplified ID for `this`
	      this.addDepth(id.depth);
	      this.opcode('getContext', id.depth);
	      this.opcode('pushContext');
	    }
	
	    this.opcode('resolvePossibleLambda');
	  },
	
	  helperSexpr: function(sexpr, program, inverse) {
	    var params = this.setupFullMustacheParams(sexpr, program, inverse),
	        name = sexpr.id.parts[0];
	
	    if (this.options.knownHelpers[name]) {
	      this.opcode('invokeKnownHelper', params.length, name);
	    } else if (this.options.knownHelpersOnly) {
	      throw new Exception("You specified knownHelpersOnly, but used the unknown helper " + name, sexpr);
	    } else {
	      this.opcode('invokeHelper', params.length, name, sexpr.isRoot);
	    }
	  },
	
	  sexpr: function(sexpr) {
	    var type = this.classifySexpr(sexpr);
	
	    if (type === "simple") {
	      this.simpleSexpr(sexpr);
	    } else if (type === "helper") {
	      this.helperSexpr(sexpr);
	    } else {
	      this.ambiguousSexpr(sexpr);
	    }
	  },
	
	  ID: function(id) {
	    this.addDepth(id.depth);
	    this.opcode('getContext', id.depth);
	
	    var name = id.parts[0];
	    if (!name) {
	      this.opcode('pushContext');
	    } else {
	      this.opcode('lookupOnContext', id.parts[0]);
	    }
	
	    for(var i=1, l=id.parts.length; i<l; i++) {
	      this.opcode('lookup', id.parts[i]);
	    }
	  },
	
	  DATA: function(data) {
	    this.options.data = true;
	    if (data.id.isScoped || data.id.depth) {
	      throw new Exception('Scoped data references are not supported: ' + data.original, data);
	    }
	
	    this.opcode('lookupData');
	    var parts = data.id.parts;
	    for(var i=0, l=parts.length; i<l; i++) {
	      this.opcode('lookup', parts[i]);
	    }
	  },
	
	  STRING: function(string) {
	    this.opcode('pushString', string.string);
	  },
	
	  INTEGER: function(integer) {
	    this.opcode('pushLiteral', integer.integer);
	  },
	
	  BOOLEAN: function(bool) {
	    this.opcode('pushLiteral', bool.bool);
	  },
	
	  comment: function() {},
	
	  // HELPERS
	  opcode: function(name) {
	    this.opcodes.push({ opcode: name, args: [].slice.call(arguments, 1) });
	  },
	
	  declare: function(name, value) {
	    this.opcodes.push({ opcode: 'DECLARE', name: name, value: value });
	  },
	
	  addDepth: function(depth) {
	    if(depth === 0) { return; }
	
	    if(!this.depths[depth]) {
	      this.depths[depth] = true;
	      this.depths.list.push(depth);
	    }
	  },
	
	  classifySexpr: function(sexpr) {
	    var isHelper   = sexpr.isHelper;
	    var isEligible = sexpr.eligibleHelper;
	    var options    = this.options;
	
	    // if ambiguous, we can possibly resolve the ambiguity now
	    if (isEligible && !isHelper) {
	      var name = sexpr.id.parts[0];
	
	      if (options.knownHelpers[name]) {
	        isHelper = true;
	      } else if (options.knownHelpersOnly) {
	        isEligible = false;
	      }
	    }
	
	    if (isHelper) { return "helper"; }
	    else if (isEligible) { return "ambiguous"; }
	    else { return "simple"; }
	  },
	
	  pushParams: function(params) {
	    var i = params.length, param;
	
	    while(i--) {
	      param = params[i];
	
	      if(this.options.stringParams) {
	        if(param.depth) {
	          this.addDepth(param.depth);
	        }
	
	        this.opcode('getContext', param.depth || 0);
	        this.opcode('pushStringParam', param.stringModeValue, param.type);
	
	        if (param.type === 'sexpr') {
	          // Subexpressions get evaluated and passed in
	          // in string params mode.
	          this.sexpr(param);
	        }
	      } else {
	        this[param.type](param);
	      }
	    }
	  },
	
	  setupFullMustacheParams: function(sexpr, program, inverse) {
	    var params = sexpr.params;
	    this.pushParams(params);
	
	    this.opcode('pushProgram', program);
	    this.opcode('pushProgram', inverse);
	
	    if (sexpr.hash) {
	      this.hash(sexpr.hash);
	    } else {
	      this.opcode('emptyHash');
	    }
	
	    return params;
	  }
	};
	
	function precompile(input, options, env) {
	  if (input == null || (typeof input !== 'string' && input.constructor !== env.AST.ProgramNode)) {
	    throw new Exception("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + input);
	  }
	
	  options = options || {};
	  if (!('data' in options)) {
	    options.data = true;
	  }
	
	  var ast = env.parse(input);
	  var environment = new env.Compiler().compile(ast, options);
	  return new env.JavaScriptCompiler().compile(environment, options);
	}
	
	exports.precompile = precompile;function compile(input, options, env) {
	  if (input == null || (typeof input !== 'string' && input.constructor !== env.AST.ProgramNode)) {
	    throw new Exception("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input);
	  }
	
	  options = options || {};
	
	  if (!('data' in options)) {
	    options.data = true;
	  }
	
	  var compiled;
	
	  function compileInput() {
	    var ast = env.parse(input);
	    var environment = new env.Compiler().compile(ast, options);
	    var templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
	    return env.template(templateSpec);
	  }
	
	  // Template is only compiled on first use and cached after that point.
	  return function(context, options) {
	    if (!compiled) {
	      compiled = compileInput();
	    }
	    return compiled.call(this, context, options);
	  };
	}
	
	exports.compile = compile;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*jshint -W004 */
	var SafeString = __webpack_require__(13)["default"];
	
	var escape = {
	  "&": "&amp;",
	  "<": "&lt;",
	  ">": "&gt;",
	  '"': "&quot;",
	  "'": "&#x27;",
	  "`": "&#x60;"
	};
	
	var badChars = /[&<>"'`]/g;
	var possible = /[&<>"'`]/;
	
	function escapeChar(chr) {
	  return escape[chr] || "&amp;";
	}
	
	function extend(obj, value) {
	  for(var key in value) {
	    if(Object.prototype.hasOwnProperty.call(value, key)) {
	      obj[key] = value[key];
	    }
	  }
	}
	
	exports.extend = extend;var toString = Object.prototype.toString;
	exports.toString = toString;
	// Sourced from lodash
	// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
	var isFunction = function(value) {
	  return typeof value === 'function';
	};
	// fallback for older versions of Chrome and Safari
	if (isFunction(/x/)) {
	  isFunction = function(value) {
	    return typeof value === 'function' && toString.call(value) === '[object Function]';
	  };
	}
	var isFunction;
	exports.isFunction = isFunction;
	var isArray = Array.isArray || function(value) {
	  return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
	};
	exports.isArray = isArray;
	
	function escapeExpression(string) {
	  // don't escape SafeStrings, since they're already safe
	  if (string instanceof SafeString) {
	    return string.toString();
	  } else if (!string && string !== 0) {
	    return "";
	  }
	
	  // Force a string conversion as this will be done by the append regardless and
	  // the regex test will do this transparently behind the scenes, causing issues if
	  // an object's to string has escaped characters in it.
	  string = "" + string;
	
	  if(!possible.test(string)) { return string; }
	  return string.replace(badChars, escapeChar);
	}
	
	exports.escapeExpression = escapeExpression;function isEmpty(value) {
	  if (!value && value !== 0) {
	    return true;
	  } else if (isArray(value) && value.length === 0) {
	    return true;
	  } else {
	    return false;
	  }
	}
	
	exports.isEmpty = isEmpty;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Utils = __webpack_require__(8);
	var Exception = __webpack_require__(7)["default"];
	
	var VERSION = "1.3.0";
	exports.VERSION = VERSION;var COMPILER_REVISION = 4;
	exports.COMPILER_REVISION = COMPILER_REVISION;
	var REVISION_CHANGES = {
	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	  2: '== 1.0.0-rc.3',
	  3: '== 1.0.0-rc.4',
	  4: '>= 1.0.0'
	};
	exports.REVISION_CHANGES = REVISION_CHANGES;
	var isArray = Utils.isArray,
	    isFunction = Utils.isFunction,
	    toString = Utils.toString,
	    objectType = '[object Object]';
	
	function HandlebarsEnvironment(helpers, partials) {
	  this.helpers = helpers || {};
	  this.partials = partials || {};
	
	  registerDefaultHelpers(this);
	}
	
	exports.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
	  constructor: HandlebarsEnvironment,
	
	  logger: logger,
	  log: log,
	
	  registerHelper: function(name, fn, inverse) {
	    if (toString.call(name) === objectType) {
	      if (inverse || fn) { throw new Exception('Arg not supported with multiple helpers'); }
	      Utils.extend(this.helpers, name);
	    } else {
	      if (inverse) { fn.not = inverse; }
	      this.helpers[name] = fn;
	    }
	  },
	
	  registerPartial: function(name, str) {
	    if (toString.call(name) === objectType) {
	      Utils.extend(this.partials,  name);
	    } else {
	      this.partials[name] = str;
	    }
	  }
	};
	
	function registerDefaultHelpers(instance) {
	  instance.registerHelper('helperMissing', function(arg) {
	    if(arguments.length === 2) {
	      return undefined;
	    } else {
	      throw new Exception("Missing helper: '" + arg + "'");
	    }
	  });
	
	  instance.registerHelper('blockHelperMissing', function(context, options) {
	    var inverse = options.inverse || function() {}, fn = options.fn;
	
	    if (isFunction(context)) { context = context.call(this); }
	
	    if(context === true) {
	      return fn(this);
	    } else if(context === false || context == null) {
	      return inverse(this);
	    } else if (isArray(context)) {
	      if(context.length > 0) {
	        return instance.helpers.each(context, options);
	      } else {
	        return inverse(this);
	      }
	    } else {
	      return fn(context);
	    }
	  });
	
	  instance.registerHelper('each', function(context, options) {
	    var fn = options.fn, inverse = options.inverse;
	    var i = 0, ret = "", data;
	
	    if (isFunction(context)) { context = context.call(this); }
	
	    if (options.data) {
	      data = createFrame(options.data);
	    }
	
	    if(context && typeof context === 'object') {
	      if (isArray(context)) {
	        for(var j = context.length; i<j; i++) {
	          if (data) {
	            data.index = i;
	            data.first = (i === 0);
	            data.last  = (i === (context.length-1));
	          }
	          ret = ret + fn(context[i], { data: data });
	        }
	      } else {
	        for(var key in context) {
	          if(context.hasOwnProperty(key)) {
	            if(data) { 
	              data.key = key; 
	              data.index = i;
	              data.first = (i === 0);
	            }
	            ret = ret + fn(context[key], {data: data});
	            i++;
	          }
	        }
	      }
	    }
	
	    if(i === 0){
	      ret = inverse(this);
	    }
	
	    return ret;
	  });
	
	  instance.registerHelper('if', function(conditional, options) {
	    if (isFunction(conditional)) { conditional = conditional.call(this); }
	
	    // Default behavior is to render the positive path if the value is truthy and not empty.
	    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
	    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
	    if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
	      return options.inverse(this);
	    } else {
	      return options.fn(this);
	    }
	  });
	
	  instance.registerHelper('unless', function(conditional, options) {
	    return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
	  });
	
	  instance.registerHelper('with', function(context, options) {
	    if (isFunction(context)) { context = context.call(this); }
	
	    if (!Utils.isEmpty(context)) return options.fn(context);
	  });
	
	  instance.registerHelper('log', function(context, options) {
	    var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
	    instance.log(level, context);
	  });
	}
	
	var logger = {
	  methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },
	
	  // State enum
	  DEBUG: 0,
	  INFO: 1,
	  WARN: 2,
	  ERROR: 3,
	  level: 3,
	
	  // can be overridden in the host environment
	  log: function(level, obj) {
	    if (logger.level <= level) {
	      var method = logger.methodMap[level];
	      if (typeof console !== 'undefined' && console[method]) {
	        console[method].call(console, obj);
	      }
	    }
	  }
	};
	exports.logger = logger;
	function log(level, obj) { logger.log(level, obj); }
	
	exports.log = log;var createFrame = function(object) {
	  var obj = {};
	  Utils.extend(obj, object);
	  return obj;
	};
	exports.createFrame = createFrame;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];
	
	function Exception(message, node) {
	  var line;
	  if (node && node.firstLine) {
	    line = node.firstLine;
	
	    message += ' - ' + line + ':' + node.firstColumn;
	  }
	
	  var tmp = Error.prototype.constructor.call(this, message);
	
	  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
	  for (var idx = 0; idx < errorProps.length; idx++) {
	    this[errorProps[idx]] = tmp[errorProps[idx]];
	  }
	
	  if (line) {
	    this.lineNumber = line;
	    this.column = node.firstColumn;
	  }
	}
	
	Exception.prototype = new Error();
	
	exports["default"] = Exception;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*jshint -W004 */
	var SafeString = __webpack_require__(16)["default"];
	
	var escape = {
	  "&": "&amp;",
	  "<": "&lt;",
	  ">": "&gt;",
	  '"': "&quot;",
	  "'": "&#x27;",
	  "`": "&#x60;"
	};
	
	var badChars = /[&<>"'`]/g;
	var possible = /[&<>"'`]/;
	
	function escapeChar(chr) {
	  return escape[chr] || "&amp;";
	}
	
	function extend(obj, value) {
	  for(var key in value) {
	    if(Object.prototype.hasOwnProperty.call(value, key)) {
	      obj[key] = value[key];
	    }
	  }
	}
	
	exports.extend = extend;var toString = Object.prototype.toString;
	exports.toString = toString;
	// Sourced from lodash
	// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
	var isFunction = function(value) {
	  return typeof value === 'function';
	};
	// fallback for older versions of Chrome and Safari
	if (isFunction(/x/)) {
	  isFunction = function(value) {
	    return typeof value === 'function' && toString.call(value) === '[object Function]';
	  };
	}
	var isFunction;
	exports.isFunction = isFunction;
	var isArray = Array.isArray || function(value) {
	  return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
	};
	exports.isArray = isArray;
	
	function escapeExpression(string) {
	  // don't escape SafeStrings, since they're already safe
	  if (string instanceof SafeString) {
	    return string.toString();
	  } else if (!string && string !== 0) {
	    return "";
	  }
	
	  // Force a string conversion as this will be done by the append regardless and
	  // the regex test will do this transparently behind the scenes, causing issues if
	  // an object's to string has escaped characters in it.
	  string = "" + string;
	
	  if(!possible.test(string)) { return string; }
	  return string.replace(badChars, escapeChar);
	}
	
	exports.escapeExpression = escapeExpression;function isEmpty(value) {
	  if (!value && value !== 0) {
	    return true;
	  } else if (isArray(value) && value.length === 0) {
	    return true;
	  } else {
	    return false;
	  }
	}
	
	exports.isEmpty = isEmpty;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// Events
	// -----------------
	// Thanks to:
	//  - https://github.com/documentcloud/backbone/blob/master/backbone.js
	//  - https://github.com/joyent/node/blob/master/lib/events.js
	
	
	// Regular expression used to split event strings
	var eventSplitter = /\s+/
	
	
	// A module that can be mixed in to *any object* in order to provide it
	// with custom events. You may bind with `on` or remove with `off` callback
	// functions to an event; `trigger`-ing an event fires all callbacks in
	// succession.
	//
	//     var object = new Events();
	//     object.on('expand', function(){ alert('expanded'); });
	//     object.trigger('expand');
	//
	function Events() {
	}
	
	
	// Bind one or more space separated events, `events`, to a `callback`
	// function. Passing `"all"` will bind the callback to all events fired.
	Events.prototype.on = function(events, callback, context) {
	  var cache, event, list
	  if (!callback) return this
	
	  cache = this.__events || (this.__events = {})
	  events = events.split(eventSplitter)
	
	  while (event = events.shift()) {
	    list = cache[event] || (cache[event] = [])
	    list.push(callback, context)
	  }
	
	  return this
	}
	
	Events.prototype.once = function(events, callback, context) {
	  var that = this
	  var cb = function() {
	    that.off(events, cb)
	    callback.apply(context || that, arguments)
	  }
	  return this.on(events, cb, context)
	}
	
	// Remove one or many callbacks. If `context` is null, removes all callbacks
	// with that function. If `callback` is null, removes all callbacks for the
	// event. If `events` is null, removes all bound callbacks for all events.
	Events.prototype.off = function(events, callback, context) {
	  var cache, event, list, i
	
	  // No events, or removing *all* events.
	  if (!(cache = this.__events)) return this
	  if (!(events || callback || context)) {
	    delete this.__events
	    return this
	  }
	
	  events = events ? events.split(eventSplitter) : keys(cache)
	
	  // Loop through the callback list, splicing where appropriate.
	  while (event = events.shift()) {
	    list = cache[event]
	    if (!list) continue
	
	    if (!(callback || context)) {
	      delete cache[event]
	      continue
	    }
	
	    for (i = list.length - 2; i >= 0; i -= 2) {
	      if (!(callback && list[i] !== callback ||
	          context && list[i + 1] !== context)) {
	        list.splice(i, 2)
	      }
	    }
	  }
	
	  return this
	}
	
	
	// Trigger one or many events, firing all bound callbacks. Callbacks are
	// passed the same arguments as `trigger` is, apart from the event name
	// (unless you're listening on `"all"`, which will cause your callback to
	// receive the true name of the event as the first argument).
	Events.prototype.trigger = function(events) {
	  var cache, event, all, list, i, len, rest = [], args, returned = true;
	  if (!(cache = this.__events)) return this
	
	  events = events.split(eventSplitter)
	
	  // Fill up `rest` with the callback arguments.  Since we're only copying
	  // the tail of `arguments`, a loop is much faster than Array#slice.
	  for (i = 1, len = arguments.length; i < len; i++) {
	    rest[i - 1] = arguments[i]
	  }
	
	  // For each event, walk through the list of callbacks twice, first to
	  // trigger the event, then to trigger any `"all"` callbacks.
	  while (event = events.shift()) {
	    // Copy callback lists to prevent modification.
	    if (all = cache.all) all = all.slice()
	    if (list = cache[event]) list = list.slice()
	
	    // Execute event callbacks except one named "all"
	    if (event !== 'all') {
	      returned = triggerEvents(list, rest, this) && returned
	    }
	
	    // Execute "all" callbacks.
	    returned = triggerEvents(all, [event].concat(rest), this) && returned
	  }
	
	  return returned
	}
	
	Events.prototype.emit = Events.prototype.trigger
	
	
	// Helpers
	// -------
	
	var keys = Object.keys
	
	if (!keys) {
	  keys = function(o) {
	    var result = []
	
	    for (var name in o) {
	      if (o.hasOwnProperty(name)) {
	        result.push(name)
	      }
	    }
	    return result
	  }
	}
	
	// Mix `Events` to object instance or Class function.
	Events.mixTo = function(receiver) {
	  receiver = isFunction(receiver) ? receiver.prototype : receiver
	  var proto = Events.prototype
	
	  var event = new Events
	  for (var key in proto) {
	    if (proto.hasOwnProperty(key)) {
	      copyProto(key)
	    }
	  }
	
	  function copyProto(key) {
	    receiver[key] = function() {
	      proto[key].apply(event, Array.prototype.slice.call(arguments))
	      return this
	    }
	  }
	}
	
	// Execute callbacks
	function triggerEvents(list, args, context) {
	  var pass = true
	
	  if (list) {
	    var i = 0, l = list.length, a1 = args[0], a2 = args[1], a3 = args[2]
	    // call is faster than apply, optimize less than 3 argu
	    // http://blog.csdn.net/zhengyinhui100/article/details/7837127
	    switch (args.length) {
	      case 0: for (; i < l; i += 2) {pass = list[i].call(list[i + 1] || context) !== false && pass} break;
	      case 1: for (; i < l; i += 2) {pass = list[i].call(list[i + 1] || context, a1) !== false && pass} break;
	      case 2: for (; i < l; i += 2) {pass = list[i].call(list[i + 1] || context, a1, a2) !== false && pass} break;
	      case 3: for (; i < l; i += 2) {pass = list[i].call(list[i + 1] || context, a1, a2, a3) !== false && pass} break;
	      default: for (; i < l; i += 2) {pass = list[i].apply(list[i + 1] || context, args) !== false && pass} break;
	    }
	  }
	  // trigger will return false if one of the callbacks return false
	  return pass;
	}
	
	function isFunction(func) {
	  return Object.prototype.toString.call(func) === '[object Function]'
	}
	
	module.exports = Events


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1),
	    Position = __webpack_require__(14),
	    Shim = __webpack_require__(26),
	    Widget = __webpack_require__(34);
	
	
	// Overlay
	// -------
	// Overlay 组件的核心特点是可定位（Positionable）和可层叠（Stackable）
	// 是一切悬浮类 UI 组件的基类
	var Overlay = Widget.extend({
	
	  attrs: {
	    // 基本属性
	    width: null,
	    height: null,
	    zIndex: 99,
	    visible: false,
	
	    // 定位配置
	    align: {
	      // element 的定位点，默认为左上角
	      selfXY: [0, 0],
	      // 基准定位元素，默认为当前可视区域
	      baseElement: Position.VIEWPORT,
	      // 基准定位元素的定位点，默认为左上角
	      baseXY: [0, 0]
	    },
	
	    // 父元素
	    parentNode: document.body
	  },
	
	  show: function () {
	    // 若从未渲染，则调用 render
	    if (!this.rendered) {
	      this.render();
	    }
	    this.set('visible', true);
	    return this;
	  },
	
	  hide: function () {
	    this.set('visible', false);
	    return this;
	  },
	
	  setup: function () {
	    var that = this;
	    // 加载 iframe 遮罩层并与 overlay 保持同步
	    this._setupShim();
	    // 窗口resize时，重新定位浮层
	    this._setupResize();
	
	    this.after('render', function () {
	      var _pos = this.element.css('position');
	      if (_pos === 'static' || _pos === 'relative') {
	        this.element.css({
	          position: 'absolute',
	          left: '-9999px',
	          top: '-9999px'
	        });
	      }
	    });
	    // 统一在显示之后重新设定位置
	    this.after('show', function () {
	      that._setPosition();
	    });
	  },
	
	  destroy: function () {
	    // 销毁两个静态数组中的实例
	    erase(this, Overlay.allOverlays);
	    erase(this, Overlay.blurOverlays);
	    return Overlay.superclass.destroy.call(this);
	  },
	
	  // 进行定位
	  _setPosition: function (align) {
	    // 不在文档流中，定位无效
	    if (!isInDocument(this.element[0])) return;
	
	    align || (align = this.get('align'));
	
	    // 如果align为空，表示不需要使用js对齐
	    if (!align) return;
	
	    var isHidden = this.element.css('display') === 'none';
	
	    // 在定位时，为避免元素高度不定，先显示出来
	    if (isHidden) {
	      this.element.css({
	        visibility: 'hidden',
	        display: 'block'
	      });
	    }
	
	    Position.pin({
	      element: this.element,
	      x: align.selfXY[0],
	      y: align.selfXY[1]
	    }, {
	      element: align.baseElement,
	      x: align.baseXY[0],
	      y: align.baseXY[1]
	    });
	
	    // 定位完成后，还原
	    if (isHidden) {
	      this.element.css({
	        visibility: '',
	        display: 'none'
	      });
	    }
	
	    return this;
	  },
	
	  // 加载 iframe 遮罩层并与 overlay 保持同步
	  _setupShim: function () {
	    var shim = new Shim(this.element);
	
	    // 在隐藏和设置位置后，要重新定位
	    // 显示后会设置位置，所以不用绑定 shim.sync
	    this.after('hide _setPosition', shim.sync, shim);
	
	    // 除了 parentNode 之外的其他属性发生变化时，都触发 shim 同步
	    var attrs = ['width', 'height'];
	    for (var attr in attrs) {
	      if (attrs.hasOwnProperty(attr)) {
	        this.on('change:' + attr, shim.sync, shim);
	      }
	    }
	
	    // 在销魂自身前要销毁 shim
	    this.before('destroy', shim.destroy, shim);
	  },
	
	  // resize窗口时重新定位浮层，用这个方法收集所有浮层实例
	  _setupResize: function () {
	    Overlay.allOverlays.push(this);
	  },
	
	  // 除了 element 和 relativeElements，点击 body 后都会隐藏 element
	  _blurHide: function (arr) {
	    arr = $.makeArray(arr);
	    arr.push(this.element);
	    this._relativeElements = arr;
	    Overlay.blurOverlays.push(this);
	  },
	
	  // 用于 set 属性后的界面更新
	  _onRenderWidth: function (val) {
	    this.element.css('width', val);
	  },
	
	  _onRenderHeight: function (val) {
	    this.element.css('height', val);
	  },
	
	  _onRenderZIndex: function (val) {
	    this.element.css('zIndex', val);
	  },
	
	  _onRenderAlign: function (val) {
	    this._setPosition(val);
	  },
	
	  _onRenderVisible: function (val) {
	    this.element[val ? 'show' : 'hide']();
	  }
	
	});
	
	// 绑定 blur 隐藏事件
	Overlay.blurOverlays = [];
	$(document).on('click', function (e) {
	  hideBlurOverlays(e);
	});
	
	// 绑定 resize 重新定位事件
	var timeout;
	var winWidth = $(window).width();
	var winHeight = $(window).height();
	Overlay.allOverlays = [];
	
	$(window).resize(function () {
	  timeout && clearTimeout(timeout);
	  timeout = setTimeout(function () {
	    var winNewWidth = $(window).width();
	    var winNewHeight = $(window).height();
	
	    // IE678 莫名其妙触发 resize
	    // http://stackoverflow.com/questions/1852751/window-resize-event-firing-in-internet-explorer
	    if (winWidth !== winNewWidth || winHeight !== winNewHeight) {
	      $(Overlay.allOverlays).each(function (i, item) {
	        // 当实例为空或隐藏时，不处理
	        if (!item || !item.get('visible')) {
	          return;
	        }
	        item._setPosition();
	      });
	    }
	
	    winWidth = winNewWidth;
	    winHeight = winNewHeight;
	  }, 80);
	});
	
	module.exports = Overlay;
	
	
	// Helpers
	// -------
	
	function isInDocument(element) {
	  return $.contains(document.documentElement, element);
	}
	
	function hideBlurOverlays(e) {
	  $(Overlay.blurOverlays).each(function (index, item) {
	    // 当实例为空或隐藏时，不处理
	    if (!item || !item.get('visible')) {
	      return;
	    }
	
	    // 遍历 _relativeElements ，当点击的元素落在这些元素上时，不处理
	    for (var i = 0; i < item._relativeElements.length; i++) {
	      var el = $(item._relativeElements[i])[0];
	      if (el === e.target || $.contains(el, e.target)) {
	        return;
	      }
	    }
	
	    // 到这里，判断触发了元素的 blur 事件，隐藏元素
	    item.hide();
	  });
	}
	
	// 从数组中删除对应元素
	
	
	function erase(target, array) {
	  for (var i = 0; i < array.length; i++) {
	    if (target === array[i]) {
	      array.splice(i, 1);
	      return array;
	    }
	  }
	}


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Exception = __webpack_require__(3)["default"];
	
	function LocationInfo(locInfo){
	  locInfo = locInfo || {};
	  this.firstLine   = locInfo.first_line;
	  this.firstColumn = locInfo.first_column;
	  this.lastColumn  = locInfo.last_column;
	  this.lastLine    = locInfo.last_line;
	}
	
	var AST = {
	  ProgramNode: function(statements, inverseStrip, inverse, locInfo) {
	    var inverseLocationInfo, firstInverseNode;
	    if (arguments.length === 3) {
	      locInfo = inverse;
	      inverse = null;
	    } else if (arguments.length === 2) {
	      locInfo = inverseStrip;
	      inverseStrip = null;
	    }
	
	    LocationInfo.call(this, locInfo);
	    this.type = "program";
	    this.statements = statements;
	    this.strip = {};
	
	    if(inverse) {
	      firstInverseNode = inverse[0];
	      if (firstInverseNode) {
	        inverseLocationInfo = {
	          first_line: firstInverseNode.firstLine,
	          last_line: firstInverseNode.lastLine,
	          last_column: firstInverseNode.lastColumn,
	          first_column: firstInverseNode.firstColumn
	        };
	        this.inverse = new AST.ProgramNode(inverse, inverseStrip, inverseLocationInfo);
	      } else {
	        this.inverse = new AST.ProgramNode(inverse, inverseStrip);
	      }
	      this.strip.right = inverseStrip.left;
	    } else if (inverseStrip) {
	      this.strip.left = inverseStrip.right;
	    }
	  },
	
	  MustacheNode: function(rawParams, hash, open, strip, locInfo) {
	    LocationInfo.call(this, locInfo);
	    this.type = "mustache";
	    this.strip = strip;
	
	    // Open may be a string parsed from the parser or a passed boolean flag
	    if (open != null && open.charAt) {
	      // Must use charAt to support IE pre-10
	      var escapeFlag = open.charAt(3) || open.charAt(2);
	      this.escaped = escapeFlag !== '{' && escapeFlag !== '&';
	    } else {
	      this.escaped = !!open;
	    }
	
	    if (rawParams instanceof AST.SexprNode) {
	      this.sexpr = rawParams;
	    } else {
	      // Support old AST API
	      this.sexpr = new AST.SexprNode(rawParams, hash);
	    }
	
	    this.sexpr.isRoot = true;
	
	    // Support old AST API that stored this info in MustacheNode
	    this.id = this.sexpr.id;
	    this.params = this.sexpr.params;
	    this.hash = this.sexpr.hash;
	    this.eligibleHelper = this.sexpr.eligibleHelper;
	    this.isHelper = this.sexpr.isHelper;
	  },
	
	  SexprNode: function(rawParams, hash, locInfo) {
	    LocationInfo.call(this, locInfo);
	
	    this.type = "sexpr";
	    this.hash = hash;
	
	    var id = this.id = rawParams[0];
	    var params = this.params = rawParams.slice(1);
	
	    // a mustache is an eligible helper if:
	    // * its id is simple (a single part, not `this` or `..`)
	    var eligibleHelper = this.eligibleHelper = id.isSimple;
	
	    // a mustache is definitely a helper if:
	    // * it is an eligible helper, and
	    // * it has at least one parameter or hash segment
	    this.isHelper = eligibleHelper && (params.length || hash);
	
	    // if a mustache is an eligible helper but not a definite
	    // helper, it is ambiguous, and will be resolved in a later
	    // pass or at runtime.
	  },
	
	  PartialNode: function(partialName, context, strip, locInfo) {
	    LocationInfo.call(this, locInfo);
	    this.type         = "partial";
	    this.partialName  = partialName;
	    this.context      = context;
	    this.strip = strip;
	  },
	
	  BlockNode: function(mustache, program, inverse, close, locInfo) {
	    LocationInfo.call(this, locInfo);
	
	    if(mustache.sexpr.id.original !== close.path.original) {
	      throw new Exception(mustache.sexpr.id.original + " doesn't match " + close.path.original, this);
	    }
	
	    this.type = 'block';
	    this.mustache = mustache;
	    this.program  = program;
	    this.inverse  = inverse;
	
	    this.strip = {
	      left: mustache.strip.left,
	      right: close.strip.right
	    };
	
	    (program || inverse).strip.left = mustache.strip.right;
	    (inverse || program).strip.right = close.strip.left;
	
	    if (inverse && !program) {
	      this.isInverse = true;
	    }
	  },
	
	  ContentNode: function(string, locInfo) {
	    LocationInfo.call(this, locInfo);
	    this.type = "content";
	    this.string = string;
	  },
	
	  HashNode: function(pairs, locInfo) {
	    LocationInfo.call(this, locInfo);
	    this.type = "hash";
	    this.pairs = pairs;
	  },
	
	  IdNode: function(parts, locInfo) {
	    LocationInfo.call(this, locInfo);
	    this.type = "ID";
	
	    var original = "",
	        dig = [],
	        depth = 0;
	
	    for(var i=0,l=parts.length; i<l; i++) {
	      var part = parts[i].part;
	      original += (parts[i].separator || '') + part;
	
	      if (part === ".." || part === "." || part === "this") {
	        if (dig.length > 0) {
	          throw new Exception("Invalid path: " + original, this);
	        } else if (part === "..") {
	          depth++;
	        } else {
	          this.isScoped = true;
	        }
	      } else {
	        dig.push(part);
	      }
	    }
	
	    this.original = original;
	    this.parts    = dig;
	    this.string   = dig.join('.');
	    this.depth    = depth;
	
	    // an ID is simple if it only has one part, and that part is not
	    // `..` or `this`.
	    this.isSimple = parts.length === 1 && !this.isScoped && depth === 0;
	
	    this.stringModeValue = this.string;
	  },
	
	  PartialNameNode: function(name, locInfo) {
	    LocationInfo.call(this, locInfo);
	    this.type = "PARTIAL_NAME";
	    this.name = name.original;
	  },
	
	  DataNode: function(id, locInfo) {
	    LocationInfo.call(this, locInfo);
	    this.type = "DATA";
	    this.id = id;
	  },
	
	  StringNode: function(string, locInfo) {
	    LocationInfo.call(this, locInfo);
	    this.type = "STRING";
	    this.original =
	      this.string =
	      this.stringModeValue = string;
	  },
	
	  IntegerNode: function(integer, locInfo) {
	    LocationInfo.call(this, locInfo);
	    this.type = "INTEGER";
	    this.original =
	      this.integer = integer;
	    this.stringModeValue = Number(integer);
	  },
	
	  BooleanNode: function(bool, locInfo) {
	    LocationInfo.call(this, locInfo);
	    this.type = "BOOLEAN";
	    this.bool = bool;
	    this.stringModeValue = bool === "true";
	  },
	
	  CommentNode: function(comment, locInfo) {
	    LocationInfo.call(this, locInfo);
	    this.type = "comment";
	    this.comment = comment;
	  }
	};
	
	// Must be exported as an object rather than the root of the module as the jison lexer
	// most modify the object to operate properly.
	exports["default"] = AST;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var parser = __webpack_require__(38)["default"];
	var AST = __webpack_require__(11)["default"];
	
	exports.parser = parser;
	
	function parse(input) {
	  // Just return if an already-compile AST was passed in.
	  if(input.constructor === AST.ProgramNode) { return input; }
	
	  parser.yy = AST;
	  return parser.parse(input);
	}
	
	exports.parse = parse;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// Build out our basic SafeString type
	function SafeString(string) {
	  this.string = string;
	}
	
	SafeString.prototype.toString = function() {
	  return "" + this.string;
	};
	
	exports["default"] = SafeString;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// Position
	// --------
	// 定位工具组件，将一个 DOM 节点相对对另一个 DOM 节点进行定位操作。
	// 代码易改，人生难得
	
	var Position = exports,
	    VIEWPORT = { _id: 'VIEWPORT', nodeType: 1 },
	    $ = __webpack_require__(1),
	    isPinFixed = false,
	    ua = (window.navigator.userAgent || "").toLowerCase(),
	    isIE6 = ua.indexOf("msie 6") !== -1;
	
	
	// 将目标元素相对于基准元素进行定位
	// 这是 Position 的基础方法，接收两个参数，分别描述了目标元素和基准元素的定位点
	Position.pin = function(pinObject, baseObject) {
	
	    // 将两个参数转换成标准定位对象 { element: a, x: 0, y: 0 }
	    pinObject = normalize(pinObject);
	    baseObject = normalize(baseObject);
	
	    // if pinObject.element is not present
	    // https://github.com/aralejs/position/pull/11
	    if (pinObject.element === VIEWPORT ||
	        pinObject.element._id === 'VIEWPORT') {
	        return;
	    }
	
	    // 设定目标元素的 position 为绝对定位
	    // 若元素的初始 position 不为 absolute，会影响元素的 display、宽高等属性
	    var pinElement = $(pinObject.element);
	
	    if (pinElement.css('position') !== 'fixed' || isIE6) {
	        pinElement.css('position', 'absolute');
	        isPinFixed = false;
	    }
	    else {
	        // 定位 fixed 元素的标志位，下面有特殊处理
	        isPinFixed = true;
	    }
	
	    // 将位置属性归一化为数值
	    // 注：必须放在上面这句 `css('position', 'absolute')` 之后，
	    //    否则获取的宽高有可能不对
	    posConverter(pinObject);
	    posConverter(baseObject);
	
	    var parentOffset = getParentOffset(pinElement);
	    var baseOffset = baseObject.offset();
	
	    // 计算目标元素的位置
	    var top = baseOffset.top + baseObject.y -
	            pinObject.y - parentOffset.top;
	
	    var left = baseOffset.left + baseObject.x -
	            pinObject.x - parentOffset.left;
	
	    // 定位目标元素
	    pinElement.css({ left: left, top: top });
	};
	
	
	// 将目标元素相对于基准元素进行居中定位
	// 接受两个参数，分别为目标元素和定位的基准元素，都是 DOM 节点类型
	Position.center = function(pinElement, baseElement) {
	    Position.pin({
	        element: pinElement,
	        x: '50%',
	        y: '50%'
	    }, {
	        element: baseElement,
	        x: '50%',
	        y: '50%'
	    });
	};
	
	
	// 这是当前可视区域的伪 DOM 节点
	// 需要相对于当前可视区域定位时，可传入此对象作为 element 参数
	Position.VIEWPORT = VIEWPORT;
	
	
	// Helpers
	// -------
	
	// 将参数包装成标准的定位对象，形似 { element: a, x: 0, y: 0 }
	function normalize(posObject) {
	    posObject = toElement(posObject) || {};
	
	    if (posObject.nodeType) {
	        posObject = { element: posObject };
	    }
	
	    var element = toElement(posObject.element) || VIEWPORT;
	    if (element.nodeType !== 1) {
	        throw new Error('posObject.element is invalid.');
	    }
	
	    var result = {
	        element: element,
	        x: posObject.x || 0,
	        y: posObject.y || 0
	    };
	
	    // config 的深度克隆会替换掉 Position.VIEWPORT, 导致直接比较为 false
	    var isVIEWPORT = (element === VIEWPORT || element._id === 'VIEWPORT');
	
	    // 归一化 offset
	    result.offset = function() {
	        // 若定位 fixed 元素，则父元素的 offset 没有意义
	        if (isPinFixed) {
	            return {
	                left: 0,
	                top: 0
	            };
	        }
	        else if (isVIEWPORT) {
	            return {
	                left: $(document).scrollLeft(),
	                top: $(document).scrollTop()
	            };
	        }
	        else {
	            return getOffset($(element)[0]);
	        }
	    };
	
	    // 归一化 size, 含 padding 和 border
	    result.size = function() {
	        var el = isVIEWPORT ? $(window) : $(element);
	        return {
	            width: el.outerWidth(),
	            height: el.outerHeight()
	        };
	    };
	
	    return result;
	}
	
	// 对 x, y 两个参数为 left|center|right|%|px 时的处理，全部处理为纯数字
	function posConverter(pinObject) {
	    pinObject.x = xyConverter(pinObject.x, pinObject, 'width');
	    pinObject.y = xyConverter(pinObject.y, pinObject, 'height');
	}
	
	// 处理 x, y 值，都转化为数字
	function xyConverter(x, pinObject, type) {
	    // 先转成字符串再说！好处理
	    x = x + '';
	
	    // 处理 px
	    x = x.replace(/px/gi, '');
	
	    // 处理 alias
	    if (/\D/.test(x)) {
	        x = x.replace(/(?:top|left)/gi, '0%')
	             .replace(/center/gi, '50%')
	             .replace(/(?:bottom|right)/gi, '100%');
	    }
	
	    // 将百分比转为像素值
	    if (x.indexOf('%') !== -1) {
	        //支持小数
	        x = x.replace(/(\d+(?:\.\d+)?)%/gi, function(m, d) {
	            return pinObject.size()[type] * (d / 100.0);
	        });
	    }
	
	    // 处理类似 100%+20px 的情况
	    if (/[+\-*\/]/.test(x)) {
	        try {
	            // eval 会影响压缩
	            // new Function 方法效率高于 for 循环拆字符串的方法
	            // 参照：http://jsperf.com/eval-newfunction-for
	            x = (new Function('return ' + x))();
	        } catch (e) {
	            throw new Error('Invalid position value: ' + x);
	        }
	    }
	
	    // 转回为数字
	    return numberize(x);
	}
	
	// 获取 offsetParent 的位置
	function getParentOffset(element) {
	    var parent = element.offsetParent();
	
	    // IE7 下，body 子节点的 offsetParent 为 html 元素，其 offset 为
	    // { top: 2, left: 2 }，会导致定位差 2 像素，所以这里将 parent
	    // 转为 document.body
	    if (parent[0] === document.documentElement) {
	        parent = $(document.body);
	    }
	
	    // 修正 ie6 下 absolute 定位不准的 bug
	    if (isIE6) {
	        parent.css('zoom', 1);
	    }
	
	    // 获取 offsetParent 的 offset
	    var offset;
	
	    // 当 offsetParent 为 body，
	    // 而且 body 的 position 是 static 时
	    // 元素并不按照 body 来定位，而是按 document 定位
	    // http://jsfiddle.net/afc163/hN9Tc/2/
	    // 因此这里的偏移值直接设为 0 0
	    if (parent[0] === document.body &&
	        parent.css('position') === 'static') {
	            offset = { top:0, left: 0 };
	    } else {
	        offset = getOffset(parent[0]);
	    }
	
	    // 根据基准元素 offsetParent 的 border 宽度，来修正 offsetParent 的基准位置
	    offset.top += numberize(parent.css('border-top-width'));
	    offset.left += numberize(parent.css('border-left-width'));
	
	    return offset;
	}
	
	function numberize(s) {
	    return parseFloat(s, 10) || 0;
	}
	
	function toElement(element) {
	    return $(element)[0];
	}
	
	// fix jQuery 1.7.2 offset
	// document.body 的 position 是 absolute 或 relative 时
	// jQuery.offset 方法无法正确获取 body 的偏移值
	//   -> http://jsfiddle.net/afc163/gMAcp/
	// jQuery 1.9.1 已经修正了这个问题
	//   -> http://jsfiddle.net/afc163/gMAcp/1/
	// 这里先实现一份
	// 参照 kissy 和 jquery 1.9.1
	//   -> https://github.com/kissyteam/kissy/blob/master/src/dom/sub-modules/base/src/base/offset.js#L366
	//   -> https://github.com/jquery/jquery/blob/1.9.1/src/offset.js#L28
	function getOffset(element) {
	    var box = element.getBoundingClientRect(),
	        docElem = document.documentElement;
	
	    // < ie8 不支持 win.pageXOffset, 则使用 docElem.scrollLeft
	    return {
	        left: box.left + (window.pageXOffset || docElem.scrollLeft) -
	              (docElem.clientLeft || document.body.clientLeft  || 0),
	        top: box.top  + (window.pageYOffset || docElem.scrollTop) -
	             (docElem.clientTop || document.body.clientTop  || 0)
	    };
	}


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1),
	    Overlay = __webpack_require__(28),
	    mask = Overlay.Mask,
	    Events = __webpack_require__(9),
	    Templatable = __webpack_require__(30),
	    Messenger = __webpack_require__(27);
	
	// Dialog
	// ---
	// Dialog 是通用对话框组件，提供显隐关闭、遮罩层、内嵌iframe、内容区域自定义功能。
	// 是所有对话框类型组件的基类。
	var Dialog = Overlay.extend({
	
	  Implements: Templatable,
	
	  attrs: {
	    // 模板
	    template: __webpack_require__(19),
	
	    // 对话框触发点
	    trigger: {
	      value: null,
	      getter: function (val) {
	        return $(val);
	      }
	    },
	
	    // 统一样式前缀
	    classPrefix: 'ui-dialog',
	
	    // 指定内容元素，可以是 url 地址
	    content: {
	      value: null,
	      setter: function (val) {
	        // 判断是否是 url 地址
	        if (/^(https?:\/\/|\/|\.\/|\.\.\/)/.test(val)) {
	          this._type = 'iframe';
	          // 用 ajax 的方式而不是 iframe 进行载入
	          if (val.indexOf('?ajax') > 0 || val.indexOf('&ajax') > 0) {
	            this._ajax = true;
	          }
	        }
	        return val;
	      }
	    },
	
	    // 是否有背景遮罩层
	    hasMask: true,
	
	    // 关闭按钮可以自定义
	    closeTpl: '×',
	
	    // 默认宽度
	    width: 500,
	
	    // 默认高度
	    height: null,
	
	    // iframe 类型时，dialog 的最初高度
	    initialHeight: 300,
	
	    // 简单的动画效果 none | fade
	    effect: 'none',
	
	    // 不用解释了吧
	    zIndex: 999,
	
	    // 是否自适应高度
	    autoFit: true,
	
	    // 默认定位左右居中，略微靠上
	    align: {
	      value: {
	        selfXY: ['50%', '50%'],
	        baseXY: ['50%', '42%']
	      },
	      getter: function (val) {
	        // 高度超过窗口的 42/50 浮层头部顶住窗口
	        // https://github.com/aralejs/dialog/issues/41
	        if (this.element.height() > $(window).height() * 0.84) {
	          return {
	            selfXY: ['50%', '0'],
	            baseXY: ['50%', '0']
	          };
	        }
	        return val;
	      }
	    }
	  },
	
	
	  parseElement: function () {
	    this.set("model", {
	      classPrefix: this.get('classPrefix')
	    });
	    Dialog.superclass.parseElement.call(this);
	    this.contentElement = this.$('[data-role=content]');
	
	    // 必要的样式
	    this.contentElement.css({
	      height: '100%',
	      zoom: 1
	    });
	    // 关闭按钮先隐藏
	    // 后面当 onRenderCloseTpl 时，如果 closeTpl 不为空，会显示出来
	    // 这样写是为了回避 arale.base 的一个问题：
	    // 当属性初始值为''时，不会进入 onRender 方法
	    // https://github.com/aralejs/base/issues/7
	    this.$('[data-role=close]').hide();
	  },
	
	  events: {
	    'click [data-role=close]': function (e) {
	      e.preventDefault();
	      this.hide();
	    }
	  },
	
	  show: function () {
	    // iframe 要在载入完成才显示
	    if (this._type === 'iframe') {
	      // ajax 读入内容并 append 到容器中
	      if (this._ajax) {
	        this._ajaxHtml();
	      } else {
	        // iframe 还未请求完，先设置一个固定高度
	        !this.get('height') && this.contentElement.css('height', this.get('initialHeight'));
	        this._showIframe();
	      }
	    }
	
	    Dialog.superclass.show.call(this);
	    return this;
	  },
	
	  hide: function () {
	    // 把 iframe 状态复原
	    if (this._type === 'iframe' && this.iframe) {
	      // 如果是跨域iframe，会抛出异常，所以需要加一层判断
	      if (!this._isCrossDomainIframe) {
	        this.iframe.attr({
	          src: 'javascript:\'\';'
	        });
	      }
	      // 原来只是将 iframe 的状态复原
	      // 但是发现在 IE6 下，将 src 置为 javascript:''; 会出现 404 页面
	      this.iframe.remove();
	      this.iframe = null;
	    }
	
	    Dialog.superclass.hide.call(this);
	    clearInterval(this._interval);
	    delete this._interval;
	    return this;
	  },
	
	  destroy: function () {
	    this.element.remove();
	    this._hideMask();
	    clearInterval(this._interval);
	    return Dialog.superclass.destroy.call(this);
	  },
	
	  setup: function () {
	    Dialog.superclass.setup.call(this);
	
	    this._setupTrigger();
	    this._setupMask();
	    this._setupKeyEvents();
	    this._setupFocus();
	    toTabed(this.element);
	    toTabed(this.get('trigger'));
	
	    // 默认当前触发器
	    this.activeTrigger = this.get('trigger').eq(0);
	  },
	
	  // onRender
	  // ---
	  _onRenderContent: function (val) {
	    if (this._type !== 'iframe') {
	      var value;
	      // 有些情况会报错
	      try {
	        value = $(val);
	      } catch (e) {
	        value = [];
	      }
	      if (value[0]) {
	        this.contentElement.empty().append(value);
	      } else {
	        this.contentElement.empty().html(val);
	      }
	      // #38 #44
	      this._setPosition();
	    }
	  },
	
	  _onRenderCloseTpl: function (val) {
	    if (val === '') {
	      this.$('[data-role=close]').html(val).hide();
	    } else {
	      this.$('[data-role=close]').html(val).show();
	    }
	  },
	
	  // 覆盖 overlay，提供动画
	  _onRenderVisible: function (val) {
	    if (val) {
	      if (this.get('effect') === 'fade') {
	        // 固定 300 的动画时长，暂不可定制
	        this.element.fadeIn(300);
	      } else {
	        this.element.show();
	      }
	    } else {
	      this.element.hide();
	    }
	  },
	
	  // 私有方法
	  // ---
	  // 绑定触发对话框出现的事件
	  _setupTrigger: function () {
	    this.delegateEvents(this.get('trigger'), 'click', function (e) {
	      e.preventDefault();
	      // 标识当前点击的元素
	      this.activeTrigger = $(e.currentTarget);
	      this.show();
	    });
	  },
	
	  // 绑定遮罩层事件
	  _setupMask: function () {
	    var that = this;
	
	    // 存放 mask 对应的对话框
	    mask._dialogs = mask._dialogs || [];
	
	    this.after('show', function () {
	      if (!this.get('hasMask')) {
	        return;
	      }
	      // not using the z-index
	      // because multiable dialogs may share same mask
	      mask.set('zIndex', that.get('zIndex')).show();
	      mask.element.insertBefore(that.element);
	
	      // 避免重复存放
	      var existed;
	      for (var i=0; i<mask._dialogs.length; i++) {
	        if (mask._dialogs[i] === that) {
	          existed = mask._dialogs[i];
	        }
	      }
	      if (existed) {
	        // 把已存在的对话框提到最后一个
	        erase(existed, mask._dialogs);
	        mask._dialogs.push(existed);
	      } else {
	        // 存放新的对话框
	        mask._dialogs.push(that);
	      }
	    });
	
	    this.after('hide', this._hideMask);
	  },
	
	  // 隐藏 mask
	  _hideMask: function () {
	    if (!this.get('hasMask')) {
	      return;
	    }
	
	    // 移除 mask._dialogs 当前实例对应的 dialog
	    var dialogLength = mask._dialogs ? mask._dialogs.length : 0;
	    for (var i=0; i<dialogLength; i++) {
	      if (mask._dialogs[i] === this) {
	        erase(this, mask._dialogs);
	
	        // 如果 _dialogs 为空了，表示没有打开的 dialog 了
	        // 则隐藏 mask
	        if (mask._dialogs.length === 0) {
	          mask.hide();
	        }
	        // 如果移除的是最后一个打开的 dialog
	        // 则相应向下移动 mask
	        else if (i === dialogLength - 1) {
	          var last = mask._dialogs[mask._dialogs.length - 1];
	          mask.set('zIndex', last.get('zIndex'));
	          mask.element.insertBefore(last.element);
	        }
	      }
	    }
	  },
	
	  // 绑定元素聚焦状态
	  _setupFocus: function () {
	    this.after('show', function () {
	      this.element.focus();
	    });
	    this.after('hide', function () {
	      // 关于网页中浮层消失后的焦点处理
	      // http://www.qt06.com/post/280/
	      this.activeTrigger && this.activeTrigger.focus();
	    });
	  },
	
	  // 绑定键盘事件，ESC关闭窗口
	  _setupKeyEvents: function () {
	    this.delegateEvents($(document), 'keyup.esc', function (e) {
	      if (e.keyCode === 27) {
	        this.get('visible') && this.hide();
	      }
	    });
	  },
	
	  _showIframe: function () {
	    var that = this;
	    // 若未创建则新建一个
	    if (!this.iframe) {
	      this._createIframe();
	    }
	
	    // 开始请求 iframe
	    this.iframe.attr({
	      src: this._fixUrl(),
	      name: 'dialog-iframe' + new Date().getTime()
	    });
	
	    // 因为在 IE 下 onload 无法触发
	    // http://my.oschina.net/liangrockman/blog/24015
	    // 所以使用 jquery 的 one 函数来代替 onload
	    // one 比 on 好，因为它只执行一次，并在执行后自动销毁
	    this.iframe.one('load', function () {
	      // 如果 dialog 已经隐藏了，就不需要触发 onload
	      if (!that.get('visible')) {
	        return;
	      }
	
	      // 是否跨域的判断需要放入iframe load之后
	      that._isCrossDomainIframe = isCrossDomainIframe(that.iframe);
	
	      if (!that._isCrossDomainIframe) {
	        // 绑定自动处理高度的事件
	        if (that.get('autoFit')) {
	          clearInterval(that._interval);
	          that._interval = setInterval(function () {
	            that._syncHeight();
	          }, 300);
	        }
	        that._syncHeight();
	      }
	
	      that._setPosition();
	      that.trigger('complete:show');
	    });
	  },
	
	  _fixUrl: function () {
	    var s = this.get('content').match(/([^?#]*)(\?[^#]*)?(#.*)?/);
	    s.shift();
	    s[1] = ((s[1] && s[1] !== '?') ? (s[1] + '&') : '?') + 't=' + new Date().getTime();
	    return s.join('');
	  },
	
	  _createIframe: function () {
	    var that = this;
	
	    this.iframe = $('<iframe>', {
	      src: 'javascript:\'\';',
	      scrolling: 'no',
	      frameborder: 'no',
	      allowTransparency: 'true',
	      css: {
	        border: 'none',
	        width: '100%',
	        display: 'block',
	        height: '100%',
	        overflow: 'hidden'
	      }
	    }).appendTo(this.contentElement);
	
	    // 给 iframe 绑一个 close 事件
	    // iframe 内部可通过 window.frameElement.trigger('close') 关闭
	    Events.mixTo(this.iframe[0]);
	    this.iframe[0].on('close', function () {
	      that.hide();
	    });
	
	    // 跨域则使用arale-messenger进行通信
	    var m = new Messenger('parent', 'arale-dialog');
	    //m.addTarget(this.iframe[0].contentWindow, 'iframe1');
	    //m.listen(function (data) {
	     // data = JSON.parse(data);
	     // switch (data.event) {
	     //   case 'close':
	      //    that.hide();
	      //    break;
	      //  case 'syncHeight':
	      //    that._setHeight(data.height.toString().slice(-2) === 'px' ? data.height : data.height + 'px');
	      //    break;
	      //  default:
	      //    break;
	      //}
	    //});
	
	  },
	
	  _setHeight: function (h) {
	    this.contentElement.css('height', h);
	    // force to reflow in ie6
	    // http://44ux.com/blog/2011/08/24/ie67-reflow-bug/
	    this.element[0].className = this.element[0].className;
	  },
	
	  _syncHeight: function () {
	    var h;
	    // 如果未传 height，才会自动获取
	    if (!this.get('height')) {
	      try {
	        this._errCount = 0;
	        h = getIframeHeight(this.iframe) + 'px';
	      } catch (err) {
	        // 页面跳转也会抛错，最多失败6次
	        this._errCount = (this._errCount || 0) + 1;
	        if (this._errCount >= 6) {
	          // 获取失败则给默认高度 300px
	          // 跨域会抛错进入这个流程
	          h = this.get('initialHeight');
	          clearInterval(this._interval);
	          delete this._interval;
	        }
	      }
	      this._setHeight(h);
	
	    } else {
	      clearInterval(this._interval);
	      delete this._interval;
	    }
	  },
	
	  _ajaxHtml: function () {
	    var that = this;
	    this.contentElement.css('height', this.get('initialHeight'));
	    this.contentElement.load(this.get('content'), function () {
	      that._setPosition();
	      that.contentElement.css('height', '');
	      that.trigger('complete:show');
	    });
	  }
	
	});
	
	module.exports = Dialog;
	
	// Helpers
	// ----
	// 让目标节点可以被 Tab
	function toTabed(element) {
	  if (element.attr('tabindex') == null) {
	    element.attr('tabindex', '-1');
	  }
	}
	
	// 获取 iframe 内部的高度
	function getIframeHeight(iframe) {
	  var D = iframe[0].contentWindow.document;
	  if (D.body.scrollHeight && D.documentElement.scrollHeight) {
	    return Math.min(D.body.scrollHeight, D.documentElement.scrollHeight);
	  } else if (D.documentElement.scrollHeight) {
	    return D.documentElement.scrollHeight;
	  } else if (D.body.scrollHeight) {
	    return D.body.scrollHeight;
	  }
	}
	
	
	// iframe 是否和当前页面跨域
	function isCrossDomainIframe(iframe) {
	  var isCrossDomain = false;
	  try {
	    iframe[0].contentWindow.document;
	  } catch (e) {
	    isCrossDomain = true;
	  }
	  return isCrossDomain;
	}
	
	// erase item from array
	function erase(item, array) {
	  var index = -1;
	  for (var i=0; i<array.length; i++) {
	    if (array[i] === item) {
	      index = i;
	      break;
	    }
	  }
	  if (index !== -1) {
	    array.splice(index, 1);
	  }
	}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	// Build out our basic SafeString type
	function SafeString(string) {
	  this.string = string;
	}
	
	SafeString.prototype.toString = function() {
	  return "" + this.string;
	};
	
	exports["default"] = SafeString;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// Create a simple path alias to allow browserify to resolve
	// the runtime on a supported path.
	module.exports = __webpack_require__(41);


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(17);
	module.exports = (Handlebars["default"] || Handlebars).template(function (Handlebars,depth0,helpers,partials,data) {
	  this.compilerInfo = [4,'>= 1.0.0'];
	helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
	  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;
	
	function program1(depth0,data) {
	  
	  var buffer = "", stack1, helper;
	  buffer += "\n<div class=\"";
	  if (helper = helpers.classPrefix) { stack1 = helper.call(depth0, {hash:{},data:data}); }
	  else { helper = (depth0 && depth0.classPrefix); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
	  buffer += escapeExpression(stack1)
	    + "-title\" data-role=\"title\">";
	  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
	  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
	  if(stack1 || stack1 === 0) { buffer += stack1; }
	  buffer += "</div>\n";
	  return buffer;
	  }
	
	function program3(depth0,data) {
	  
	  var buffer = "", stack1, helper;
	  buffer += "\n    <div class=\"";
	  if (helper = helpers.classPrefix) { stack1 = helper.call(depth0, {hash:{},data:data}); }
	  else { helper = (depth0 && depth0.classPrefix); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
	  buffer += escapeExpression(stack1)
	    + "-operation\" data-role=\"foot\">\n        ";
	  stack1 = helpers['if'].call(depth0, (depth0 && depth0.confirmTpl), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
	  if(stack1 || stack1 === 0) { buffer += stack1; }
	  buffer += "\n        ";
	  stack1 = helpers['if'].call(depth0, (depth0 && depth0.cancelTpl), {hash:{},inverse:self.noop,fn:self.program(6, program6, data),data:data});
	  if(stack1 || stack1 === 0) { buffer += stack1; }
	  buffer += "\n    </div>\n    ";
	  return buffer;
	  }
	function program4(depth0,data) {
	  
	  var buffer = "", stack1, helper;
	  buffer += "\n        <div class=\"";
	  if (helper = helpers.classPrefix) { stack1 = helper.call(depth0, {hash:{},data:data}); }
	  else { helper = (depth0 && depth0.classPrefix); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
	  buffer += escapeExpression(stack1)
	    + "-confirm\" data-role=\"confirm\">\n            ";
	  if (helper = helpers.confirmTpl) { stack1 = helper.call(depth0, {hash:{},data:data}); }
	  else { helper = (depth0 && depth0.confirmTpl); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
	  if(stack1 || stack1 === 0) { buffer += stack1; }
	  buffer += "\n        </div>\n        ";
	  return buffer;
	  }
	
	function program6(depth0,data) {
	  
	  var buffer = "", stack1, helper;
	  buffer += "\n        <div class=\"";
	  if (helper = helpers.classPrefix) { stack1 = helper.call(depth0, {hash:{},data:data}); }
	  else { helper = (depth0 && depth0.classPrefix); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
	  buffer += escapeExpression(stack1)
	    + "-cancel\" data-role=\"cancel\">\n            ";
	  if (helper = helpers.cancelTpl) { stack1 = helper.call(depth0, {hash:{},data:data}); }
	  else { helper = (depth0 && depth0.cancelTpl); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
	  if(stack1 || stack1 === 0) { buffer += stack1; }
	  buffer += "\n        </div>\n        ";
	  return buffer;
	  }
	
	  stack1 = helpers['if'].call(depth0, (depth0 && depth0.title), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
	  if(stack1 || stack1 === 0) { buffer += stack1; }
	  buffer += "\n<div class=\"";
	  if (helper = helpers.classPrefix) { stack1 = helper.call(depth0, {hash:{},data:data}); }
	  else { helper = (depth0 && depth0.classPrefix); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
	  buffer += escapeExpression(stack1)
	    + "-container\">\n    <div class=\"";
	  if (helper = helpers.classPrefix) { stack1 = helper.call(depth0, {hash:{},data:data}); }
	  else { helper = (depth0 && depth0.classPrefix); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
	  buffer += escapeExpression(stack1)
	    + "-message\" data-role=\"message\">";
	  if (helper = helpers.message) { stack1 = helper.call(depth0, {hash:{},data:data}); }
	  else { helper = (depth0 && depth0.message); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
	  if(stack1 || stack1 === 0) { buffer += stack1; }
	  buffer += "</div>\n    ";
	  stack1 = helpers['if'].call(depth0, (depth0 && depth0.hasFoot), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
	  if(stack1 || stack1 === 0) { buffer += stack1; }
	  buffer += "\n</div>\n";
	  return buffer;
	  });

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(17);
	module.exports = (Handlebars["default"] || Handlebars).template(function (Handlebars,depth0,helpers,partials,data) {
	  this.compilerInfo = [4,'>= 1.0.0'];
	helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
	  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;
	
	
	  buffer += "<div class=\"";
	  if (helper = helpers.classPrefix) { stack1 = helper.call(depth0, {hash:{},data:data}); }
	  else { helper = (depth0 && depth0.classPrefix); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
	  buffer += escapeExpression(stack1)
	    + "\">\n    <a class=\"";
	  if (helper = helpers.classPrefix) { stack1 = helper.call(depth0, {hash:{},data:data}); }
	  else { helper = (depth0 && depth0.classPrefix); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
	  buffer += escapeExpression(stack1)
	    + "-close\" title=\"Close\" href=\"javascript:;\" data-role=\"close\"></a>\n    <div class=\"";
	  if (helper = helpers.classPrefix) { stack1 = helper.call(depth0, {hash:{},data:data}); }
	  else { helper = (depth0 && depth0.classPrefix); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
	  buffer += escapeExpression(stack1)
	    + "-content\" data-role=\"content\"></div>\n</div>\n";
	  return buffer;
	  });

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(15);
	module.exports.ConfirmBox = __webpack_require__(40);


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(24);


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// Aspect
	// ---------------------
	// Thanks to:
	//  - http://yuilibrary.com/yui/docs/api/classes/Do.html
	//  - http://code.google.com/p/jquery-aop/
	//  - http://lazutkin.com/blog/2008/may/18/aop-aspect-javascript-dojo/
	
	
	// 在指定方法执行前，先执行 callback
	exports.before = function(methodName, callback, context) {
	  return weave.call(this, 'before', methodName, callback, context);
	};
	
	
	// 在指定方法执行后，再执行 callback
	exports.after = function(methodName, callback, context) {
	  return weave.call(this, 'after', methodName, callback, context);
	};
	
	
	// Helpers
	// -------
	
	var eventSplitter = /\s+/;
	
	function weave(when, methodName, callback, context) {
	  var names = methodName.split(eventSplitter);
	  var name, method;
	
	  while (name = names.shift()) {
	    method = getMethod(this, name);
	    if (!method.__isAspected) {
	      wrap.call(this, name);
	    }
	    this.on(when + ':' + name, callback, context);
	  }
	
	  return this;
	}
	
	
	function getMethod(host, methodName) {
	  var method = host[methodName];
	  if (!method) {
	    throw new Error('Invalid method name: ' + methodName);
	  }
	  return method;
	}
	
	
	function wrap(methodName) {
	  var old = this[methodName];
	
	  this[methodName] = function() {
	    var args = Array.prototype.slice.call(arguments);
	    var beforeArgs = ['before:' + methodName].concat(args);
	
	    // prevent if trigger return false
	    if (this.trigger.apply(this, beforeArgs) === false) return;
	
	    var ret = old.apply(this, arguments);
	    var afterArgs = ['after:' + methodName, ret].concat(args);
	    this.trigger.apply(this, afterArgs);
	
	    return ret;
	  };
	
	  this[methodName].__isAspected = true;
	}


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// Attribute
	// -----------------
	// Thanks to:
	//  - http://documentcloud.github.com/backbone/#Model
	//  - http://yuilibrary.com/yui/docs/api/classes/AttributeCore.html
	//  - https://github.com/berzniz/backbone.getters.setters
	
	
	// 负责 attributes 的初始化
	// attributes 是与实例相关的状态信息，可读可写，发生变化时，会自动触发相关事件
	exports.initAttrs = function(config) {
	  // initAttrs 是在初始化时调用的，默认情况下实例上肯定没有 attrs，不存在覆盖问题
	  var attrs = this.attrs = {};
	
	  // Get all inherited attributes.
	  var specialProps = this.propsInAttrs || [];
	  mergeInheritedAttrs(attrs, this, specialProps);
	
	  // Merge user-specific attributes from config.
	  if (config) {
	    mergeUserValue(attrs, config);
	  }
	
	  // 对于有 setter 的属性，要用初始值 set 一下，以保证关联属性也一同初始化
	  setSetterAttrs(this, attrs, config);
	
	  // Convert `on/before/afterXxx` config to event handler.
	  parseEventsFromAttrs(this, attrs);
	
	  // 将 this.attrs 上的 special properties 放回 this 上
	  copySpecialProps(specialProps, this, attrs, true);
	};
	
	
	// Get the value of an attribute.
	exports.get = function(key) {
	  var attr = this.attrs[key] || {};
	  var val = attr.value;
	  return attr.getter ? attr.getter.call(this, val, key) : val;
	};
	
	
	// Set a hash of model attributes on the object, firing `"change"` unless
	// you choose to silence it.
	exports.set = function(key, val, options) {
	  var attrs = {};
	
	  // set("key", val, options)
	  if (isString(key)) {
	    attrs[key] = val;
	  }
	  // set({ "key": val, "key2": val2 }, options)
	  else {
	    attrs = key;
	    options = val;
	  }
	
	  options || (options = {});
	  var silent = options.silent;
	  var override = options.override;
	
	  var now = this.attrs;
	  var changed = this.__changedAttrs || (this.__changedAttrs = {});
	
	  for (key in attrs) {
	    if (!attrs.hasOwnProperty(key)) continue;
	
	    var attr = now[key] || (now[key] = {});
	    val = attrs[key];
	
	    if (attr.readOnly) {
	      throw new Error('This attribute is readOnly: ' + key);
	    }
	
	    // invoke setter
	    if (attr.setter) {
	      val = attr.setter.call(this, val, key);
	    }
	
	    // 获取设置前的 prev 值
	    var prev = this.get(key);
	
	    // 获取需要设置的 val 值
	    // 如果设置了 override 为 true，表示要强制覆盖，就不去 merge 了
	    // 都为对象时，做 merge 操作，以保留 prev 上没有覆盖的值
	    if (!override && isPlainObject(prev) && isPlainObject(val)) {
	      val = merge(merge({}, prev), val);
	    }
	
	    // set finally
	    now[key].value = val;
	
	    // invoke change event
	    // 初始化时对 set 的调用，不触发任何事件
	    if (!this.__initializingAttrs && !isEqual(prev, val)) {
	      if (silent) {
	        changed[key] = [val, prev];
	      }
	      else {
	        this.trigger('change:' + key, val, prev, key);
	      }
	    }
	  }
	
	  return this;
	};
	
	
	// Call this method to manually fire a `"change"` event for triggering
	// a `"change:attribute"` event for each changed attribute.
	exports.change = function() {
	  var changed = this.__changedAttrs;
	
	  if (changed) {
	    for (var key in changed) {
	      if (changed.hasOwnProperty(key)) {
	        var args = changed[key];
	        this.trigger('change:' + key, args[0], args[1], key);
	      }
	    }
	    delete this.__changedAttrs;
	  }
	
	  return this;
	};
	
	// for test
	exports._isPlainObject = isPlainObject;
	
	// Helpers
	// -------
	
	var toString = Object.prototype.toString;
	var hasOwn = Object.prototype.hasOwnProperty;
	
	/**
	 * Detect the JScript [[DontEnum]] bug:
	 * In IE < 9 an objects own properties, shadowing non-enumerable ones, are
	 * made non-enumerable as well.
	 * https://github.com/bestiejs/lodash/blob/7520066fc916e205ef84cb97fbfe630d7c154158/lodash.js#L134-L144
	 */
	/** Detect if own properties are iterated after inherited properties (IE < 9) */
	var iteratesOwnLast;
	(function() {
	  var props = [];
	  function Ctor() { this.x = 1; }
	  Ctor.prototype = { 'valueOf': 1, 'y': 1 };
	  for (var prop in new Ctor()) { props.push(prop); }
	  iteratesOwnLast = props[0] !== 'x';
	}());
	
	var isArray = Array.isArray || function(val) {
	  return toString.call(val) === '[object Array]';
	};
	
	function isString(val) {
	  return toString.call(val) === '[object String]';
	}
	
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}
	
	function isWindow(o) {
	  return o != null && o == o.window;
	}
	
	function isPlainObject(o) {
	  // Must be an Object.
	  // Because of IE, we also have to check the presence of the constructor
	  // property. Make sure that DOM nodes and window objects don't
	  // pass through, as well
	  if (!o || toString.call(o) !== "[object Object]" ||
	      o.nodeType || isWindow(o)) {
	    return false;
	  }
	
	  try {
	    // Not own constructor property must be Object
	    if (o.constructor &&
	        !hasOwn.call(o, "constructor") &&
	        !hasOwn.call(o.constructor.prototype, "isPrototypeOf")) {
	      return false;
	    }
	  } catch (e) {
	    // IE8,9 Will throw exceptions on certain host objects #9897
	    return false;
	  }
	
	  var key;
	
	  // Support: IE<9
	  // Handle iteration over inherited properties before own properties.
	  // http://bugs.jquery.com/ticket/12199
	  if (iteratesOwnLast) {
	    for (key in o) {
	      return hasOwn.call(o, key);
	    }
	  }
	
	  // Own properties are enumerated firstly, so to speed up,
	  // if last one is own, then all properties are own.
	  for (key in o) {}
	
	  return key === undefined || hasOwn.call(o, key);
	}
	
	function isEmptyObject(o) {
	  if (!o || toString.call(o) !== "[object Object]" ||
	      o.nodeType || isWindow(o) || !o.hasOwnProperty) {
	    return false;
	  }
	
	  for (var p in o) {
	    if (o.hasOwnProperty(p)) return false;
	  }
	  return true;
	}
	
	function merge(receiver, supplier) {
	  var key, value;
	
	  for (key in supplier) {
	    if (supplier.hasOwnProperty(key)) {
	      receiver[key] = cloneValue(supplier[key], receiver[key]);
	    }
	  }
	
	  return receiver;
	}
	
	// 只 clone 数组和 plain object，其他的保持不变
	function cloneValue(value, prev){
	  if (isArray(value)) {
	    value = value.slice();
	  }
	  else if (isPlainObject(value)) {
	    isPlainObject(prev) || (prev = {});
	
	    value = merge(prev, value);
	  }
	
	  return value;
	}
	
	var keys = Object.keys;
	
	if (!keys) {
	  keys = function(o) {
	    var result = [];
	
	    for (var name in o) {
	      if (o.hasOwnProperty(name)) {
	        result.push(name);
	      }
	    }
	    return result;
	  };
	}
	
	function mergeInheritedAttrs(attrs, instance, specialProps) {
	  var inherited = [];
	  var proto = instance.constructor.prototype;
	
	  while (proto) {
	    // 不要拿到 prototype 上的
	    if (!proto.hasOwnProperty('attrs')) {
	      proto.attrs = {};
	    }
	
	    // 将 proto 上的特殊 properties 放到 proto.attrs 上，以便合并
	    copySpecialProps(specialProps, proto.attrs, proto);
	
	    // 为空时不添加
	    if (!isEmptyObject(proto.attrs)) {
	      inherited.unshift(proto.attrs);
	    }
	
	    // 向上回溯一级
	    proto = proto.constructor.superclass;
	  }
	
	  // Merge and clone default values to instance.
	  for (var i = 0, len = inherited.length; i < len; i++) {
	    mergeAttrs(attrs, normalize(inherited[i]));
	  }
	}
	
	function mergeUserValue(attrs, config) {
	  mergeAttrs(attrs, normalize(config, true), true);
	}
	
	function copySpecialProps(specialProps, receiver, supplier, isAttr2Prop) {
	  for (var i = 0, len = specialProps.length; i < len; i++) {
	    var key = specialProps[i];
	
	    if (supplier.hasOwnProperty(key)) {
	      receiver[key] = isAttr2Prop ? receiver.get(key) : supplier[key];
	    }
	  }
	}
	
	
	var EVENT_PATTERN = /^(on|before|after)([A-Z].*)$/;
	var EVENT_NAME_PATTERN = /^(Change)?([A-Z])(.*)/;
	
	function parseEventsFromAttrs(host, attrs) {
	  for (var key in attrs) {
	    if (attrs.hasOwnProperty(key)) {
	      var value = attrs[key].value, m;
	
	      if (isFunction(value) && (m = key.match(EVENT_PATTERN))) {
	        host[m[1]](getEventName(m[2]), value);
	        delete attrs[key];
	      }
	    }
	  }
	}
	
	// Converts `Show` to `show` and `ChangeTitle` to `change:title`
	function getEventName(name) {
	  var m = name.match(EVENT_NAME_PATTERN);
	  var ret = m[1] ? 'change:' : '';
	  ret += m[2].toLowerCase() + m[3];
	  return ret;
	}
	
	
	function setSetterAttrs(host, attrs, config) {
	  var options = { silent: true };
	  host.__initializingAttrs = true;
	
	  for (var key in config) {
	    if (config.hasOwnProperty(key)) {
	      if (attrs[key].setter) {
	        host.set(key, config[key], options);
	      }
	    }
	  }
	
	  delete host.__initializingAttrs;
	}
	
	
	var ATTR_SPECIAL_KEYS = ['value', 'getter', 'setter', 'readOnly'];
	
	// normalize `attrs` to
	//
	//   {
	//      value: 'xx',
	//      getter: fn,
	//      setter: fn,
	//      readOnly: boolean
	//   }
	//
	function normalize(attrs, isUserValue) {
	  var newAttrs = {};
	
	  for (var key in attrs) {
	    var attr = attrs[key];
	
	    if (!isUserValue &&
	        isPlainObject(attr) &&
	        hasOwnProperties(attr, ATTR_SPECIAL_KEYS)) {
	      newAttrs[key] = attr;
	      continue;
	    }
	
	    newAttrs[key] = {
	      value: attr
	    };
	  }
	
	  return newAttrs;
	}
	
	var ATTR_OPTIONS = ['setter', 'getter', 'readOnly'];
	// 专用于 attrs 的 merge 方法
	function mergeAttrs(attrs, inheritedAttrs, isUserValue){
	  var key, value;
	  var attr;
	
	  for (key in inheritedAttrs) {
	    if (inheritedAttrs.hasOwnProperty(key)) {
	      value = inheritedAttrs[key];
	      attr = attrs[key];
	
	      if (!attr) {
	        attr = attrs[key] = {};
	      }
	
	      // 从严谨上来说，遍历 ATTR_SPECIAL_KEYS 更好
	      // 从性能来说，直接 人肉赋值 更快
	      // 这里还是选择 性能优先
	
	      // 只有 value 要复制原值，其他的直接覆盖即可
	      (value['value'] !== undefined) && (attr['value'] = cloneValue(value['value'], attr['value']));
	
	      // 如果是用户赋值，只要考虑value
	      if (isUserValue) continue;
	
	      for (var i in ATTR_OPTIONS) {
	        var option = ATTR_OPTIONS[i];
	        if (value[option] !== undefined) {
	          attr[option] = value[option];
	        }
	      }
	    }
	  }
	
	  return attrs;
	}
	
	function hasOwnProperties(object, properties) {
	  for (var i = 0, len = properties.length; i < len; i++) {
	    if (object.hasOwnProperty(properties[i])) {
	      return true;
	    }
	  }
	  return false;
	}
	
	
	// 对于 attrs 的 value 来说，以下值都认为是空值： null, undefined, '', [], {}
	function isEmptyAttrValue(o) {
	  return o == null || // null, undefined
	      (isString(o) || isArray(o)) && o.length === 0 || // '', []
	      isEmptyObject(o); // {}
	}
	
	// 判断属性值 a 和 b 是否相等，注意仅适用于属性值的判断，非普适的 === 或 == 判断。
	function isEqual(a, b) {
	  if (a === b) return true;
	
	  if (isEmptyAttrValue(a) && isEmptyAttrValue(b)) return true;
	
	  // Compare `[[Class]]` names.
	  var className = toString.call(a);
	  if (className != toString.call(b)) return false;
	
	  switch (className) {
	
	    // Strings, numbers, dates, and booleans are compared by value.
	    case '[object String]':
	      // Primitives and their corresponding object wrappers are
	      // equivalent; thus, `"5"` is equivalent to `new String("5")`.
	      return a == String(b);
	
	    case '[object Number]':
	      // `NaN`s are equivalent, but non-reflexive. An `equal`
	      // comparison is performed for other numeric values.
	      return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
	
	    case '[object Date]':
	    case '[object Boolean]':
	      // Coerce dates and booleans to numeric primitive values.
	      // Dates are compared by their millisecond representations.
	      // Note that invalid dates with millisecond representations
	      // of `NaN` are not equivalent.
	      return +a == +b;
	
	    // RegExps are compared by their source patterns and flags.
	    case '[object RegExp]':
	      return a.source == b.source &&
	          a.global == b.global &&
	          a.multiline == b.multiline &&
	          a.ignoreCase == b.ignoreCase;
	
	    // 简单判断数组包含的 primitive 值是否相等
	    case '[object Array]':
	      var aString = a.toString();
	      var bString = b.toString();
	
	      // 只要包含非 primitive 值，为了稳妥起见，都返回 false
	      return aString.indexOf('[object') === -1 &&
	          bString.indexOf('[object') === -1 &&
	          aString === bString;
	  }
	
	  if (typeof a != 'object' || typeof b != 'object') return false;
	
	  // 简单判断两个对象是否相等，只判断第一层
	  if (isPlainObject(a) && isPlainObject(b)) {
	
	    // 键值不相等，立刻返回 false
	    if (!isEqual(keys(a), keys(b))) {
	      return false;
	    }
	
	    // 键相同，但有值不等，立刻返回 false
	    for (var p in a) {
	      if (a[p] !== b[p]) return false;
	    }
	
	    return true;
	  }
	
	  // 其他情况返回 false, 以避免误判导致 change 事件没发生
	  return false;
	}


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// Base
	// ---------
	// Base 是一个基础类，提供 Class、Events、Attrs 和 Aspect 支持。
	
	var Class = __webpack_require__(25);
	var Events = __webpack_require__(9);
	var Aspect = __webpack_require__(22);
	var Attribute = __webpack_require__(23);
	
	
	module.exports = Class.create({
	  Implements: [Events, Aspect, Attribute],
	
	  initialize: function(config) {
	    this.initAttrs(config);
	
	    // Automatically register `this._onChangeAttr` method as
	    // a `change:attr` event handler.
	    parseEventsFromInstance(this, this.attrs);
	  },
	
	  destroy: function() {
	    this.off();
	
	    for (var p in this) {
	      if (this.hasOwnProperty(p)) {
	        delete this[p];
	      }
	    }
	
	    // Destroy should be called only once, generate a fake destroy after called
	    // https://github.com/aralejs/widget/issues/50
	    this.destroy = function() {};
	  }
	});
	
	
	function parseEventsFromInstance(host, attrs) {
	  for (var attr in attrs) {
	    if (attrs.hasOwnProperty(attr)) {
	      var m = '_onChange' + ucfirst(attr);
	      if (host[m]) {
	        host.on('change:' + attr, host[m]);
	      }
	    }
	  }
	}
	
	function ucfirst(str) {
	  return str.charAt(0).toUpperCase() + str.substring(1);
	}


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// Class
	// -----------------
	// Thanks to:
	//  - http://mootools.net/docs/core/Class/Class
	//  - http://ejohn.org/blog/simple-javascript-inheritance/
	//  - https://github.com/ded/klass
	//  - http://documentcloud.github.com/backbone/#Model-extend
	//  - https://github.com/joyent/node/blob/master/lib/util.js
	//  - https://github.com/kissyteam/kissy/blob/master/src/seed/src/kissy.js
	
	
	// The base Class implementation.
	function Class(o) {
	  // Convert existed function to Class.
	  if (!(this instanceof Class) && isFunction(o)) {
	    return classify(o)
	  }
	}
	
	module.exports = Class
	
	
	// Create a new Class.
	//
	//  var SuperPig = Class.create({
	//    Extends: Animal,
	//    Implements: Flyable,
	//    initialize: function() {
	//      SuperPig.superclass.initialize.apply(this, arguments)
	//    },
	//    Statics: {
	//      COLOR: 'red'
	//    }
	// })
	//
	Class.create = function(parent, properties) {
	  if (!isFunction(parent)) {
	    properties = parent
	    parent = null
	  }
	
	  properties || (properties = {})
	  parent || (parent = properties.Extends || Class)
	  properties.Extends = parent
	
	  // The created class constructor
	  function SubClass() {
	    // Call the parent constructor.
	    parent.apply(this, arguments)
	
	    // Only call initialize in self constructor.
	    if (this.constructor === SubClass && this.initialize) {
	      this.initialize.apply(this, arguments)
	    }
	  }
	
	  // Inherit class (static) properties from parent.
	  if (parent !== Class) {
	    mix(SubClass, parent, parent.StaticsWhiteList)
	  }
	
	  // Add instance properties to the subclass.
	  implement.call(SubClass, properties)
	
	  // Make subclass extendable.
	  return classify(SubClass)
	}
	
	
	function implement(properties) {
	  var key, value
	
	  for (key in properties) {
	    value = properties[key]
	
	    if (Class.Mutators.hasOwnProperty(key)) {
	      Class.Mutators[key].call(this, value)
	    } else {
	      this.prototype[key] = value
	    }
	  }
	}
	
	
	// Create a sub Class based on `Class`.
	Class.extend = function(properties) {
	  properties || (properties = {})
	  properties.Extends = this
	
	  return Class.create(properties)
	}
	
	
	function classify(cls) {
	  cls.extend = Class.extend
	  cls.implement = implement
	  return cls
	}
	
	
	// Mutators define special properties.
	Class.Mutators = {
	
	  'Extends': function(parent) {
	    var existed = this.prototype
	    var proto = createProto(parent.prototype)
	
	    // Keep existed properties.
	    mix(proto, existed)
	
	    // Enforce the constructor to be what we expect.
	    proto.constructor = this
	
	    // Set the prototype chain to inherit from `parent`.
	    this.prototype = proto
	
	    // Set a convenience property in case the parent's prototype is
	    // needed later.
	    this.superclass = parent.prototype
	  },
	
	  'Implements': function(items) {
	    isArray(items) || (items = [items])
	    var proto = this.prototype, item
	
	    while (item = items.shift()) {
	      mix(proto, item.prototype || item)
	    }
	  },
	
	  'Statics': function(staticProperties) {
	    mix(this, staticProperties)
	  }
	}
	
	
	// Shared empty constructor function to aid in prototype-chain creation.
	function Ctor() {
	}
	
	// See: http://jsperf.com/object-create-vs-new-ctor
	var createProto = Object.__proto__ ?
	    function(proto) {
	      return { __proto__: proto }
	    } :
	    function(proto) {
	      Ctor.prototype = proto
	      return new Ctor()
	    }
	
	
	// Helpers
	// ------------
	
	function mix(r, s, wl) {
	  // Copy "all" properties including inherited ones.
	  for (var p in s) {
	    if (s.hasOwnProperty(p)) {
	      if (wl && indexOf(wl, p) === -1) continue
	
	      // 在 iPhone 1 代等设备的 Safari 中，prototype 也会被枚举出来，需排除
	      if (p !== 'prototype') {
	        r[p] = s[p]
	      }
	    }
	  }
	}
	
	
	var toString = Object.prototype.toString
	
	var isArray = Array.isArray || function(val) {
	    return toString.call(val) === '[object Array]'
	}
	
	var isFunction = function(val) {
	  return toString.call(val) === '[object Function]'
	}
	
	var indexOf = Array.prototype.indexOf ?
	    function(arr, item) {
	      return arr.indexOf(item)
	    } :
	    function(arr, item) {
	      for (var i = 0, len = arr.length; i < len; i++) {
	        if (arr[i] === item) {
	          return i
	        }
	      }
	      return -1
	    }


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var Position = __webpack_require__(14);
	
	var isIE6 = (window.navigator.userAgent || '').toLowerCase().indexOf('msie 6') !== -1;
	
	// target 是需要添加垫片的目标元素，可以传 `DOM Element` 或 `Selector`
	function Shim(target) {
	    // 如果选择器选了多个 DOM，则只取第一个
	    this.target = $(target).eq(0);
	}
	
	// 根据目标元素计算 iframe 的显隐、宽高、定位
	Shim.prototype.sync = function() {
	    var target = this.target;
	    var iframe = this.iframe;
	
	    // 如果未传 target 则不处理
	    if (!target.length) return this;
	
	    var height = target.outerHeight();
	    var width = target.outerWidth();
	
	    // 如果目标元素隐藏，则 iframe 也隐藏
	    // jquery 判断宽高同时为 0 才算隐藏，这里判断宽高其中一个为 0 就隐藏
	    // http://api.jquery.com/hidden-selector/
	    if (!height || !width || target.is(':hidden')) {
	        iframe && iframe.hide();
	    } else {
	        // 第一次显示时才创建：as lazy as possible
	        iframe || (iframe = this.iframe = createIframe(target));
	
	        iframe.css({
	            'height': height,
	            'width': width
	        });
	
	        Position.pin(iframe[0], target[0]);
	        iframe.show();
	    }
	
	    return this;
	};
	
	// 销毁 iframe 等
	Shim.prototype.destroy = function() {
	    if (this.iframe) {
	        this.iframe.remove();
	        delete this.iframe;
	    }
	    delete this.target;
	};
	
	if (isIE6) {
	    module.exports = Shim;
	} else {
	    // 除了 IE6 都返回空函数
	    function Noop() {}
	
	    Noop.prototype.sync = function() {return this};
	    Noop.prototype.destroy = Noop;
	
	    module.exports = Noop;
	}
	
	// Helpers
	
	// 在 target 之前创建 iframe，这样就没有 z-index 问题
	// iframe 永远在 target 下方
	function createIframe(target) {
	    var css = {
	        display: 'none',
	        border: 'none',
	        opacity: 0,
	        position: 'absolute'
	    };
	
	    // 如果 target 存在 zIndex 则设置
	    var zIndex = target.css('zIndex');
	    if (zIndex && zIndex > 0) {
	        css.zIndex = zIndex - 1;
	    }
	
	    return $('<iframe>', {
	        src: 'javascript:\'\'', // 不加的话，https 下会弹警告
	        frameborder: 0,
	        css: css
	    }).insertBefore(target);
	}


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 *     __  ___
	 *    /  |/  /___   _____ _____ ___   ____   ____ _ ___   _____
	 *   / /|_/ // _ \ / ___// ___// _ \ / __ \ / __ `// _ \ / ___/
	 *  / /  / //  __/(__  )(__  )/  __// / / // /_/ //  __// /
	 * /_/  /_/ \___//____//____/ \___//_/ /_/ \__, / \___//_/
	 *                                        /____/
	 *
	 * @description MessengerJS, a common cross-document communicate solution.
	 * @author biqing kwok
	 * @version 2.0
	 * @license release under MIT license
	 */
	
	module.exports = (function(){
	
	    // 消息前缀, 建议使用自己的项目名, 避免多项目之间的冲突
	    var prefix = "arale-messenger",
	        supportPostMessage = 'postMessage' in window;
	
	    // Target 类, 消息对象
	    function Target(target, name){
	        var errMsg = '';
	        if(arguments.length < 2){
	            errMsg = 'target error - target and name are both required';
	        } else if (typeof target != 'object'){
	            errMsg = 'target error - target itself must be window object';
	        } else if (typeof name != 'string'){
	            errMsg = 'target error - target name must be string type';
	        }
	        if(errMsg){
	            throw new Error(errMsg);
	        }
	        this.target = target;
	        this.name = name;
	    }
	
	    // 往 target 发送消息, 出于安全考虑, 发送消息会带上前缀
	    if ( supportPostMessage ){
	        // IE8+ 以及现代浏览器支持
	        Target.prototype.send = function(msg){
	            this.target.postMessage(prefix + msg, '*');
	        };
	    } else {
	        // 兼容IE 6/7
	        Target.prototype.send = function(msg){
	            var targetFunc = window.navigator[prefix + this.name];
	            if ( typeof targetFunc == 'function' ) {
	                targetFunc(prefix + msg, window);
	            } else {
	                throw new Error("target callback function is not defined");
	            }
	        };
	    }
	
	    // 信使类
	    // 创建Messenger实例时指定, 必须指定Messenger的名字, (可选)指定项目名, 以避免Mashup类应用中的冲突
	    // !注意: 父子页面中projectName必须保持一致, 否则无法匹配
	    function Messenger(messengerName, projectName){
	        this.targets = {};
	        this.name = messengerName;
	        this.listenFunc = [];
	        prefix = projectName || prefix;
	        this.initListen();
	    }
	
	    // 添加一个消息对象
	    Messenger.prototype.addTarget = function(target, name){
	        var targetObj = new Target(target, name);
	        this.targets[name] = targetObj;
	    };
	
	    // 初始化消息监听
	    Messenger.prototype.initListen = function(){
	        var self = this;
	        var generalCallback = function(msg){
	            if(typeof msg == 'object' && msg.data){
	                msg = msg.data;
	            }
	            // 剥离消息前缀
	            msg = msg.slice(prefix.length);
	            for(var i = 0; i < self.listenFunc.length; i++){
	                self.listenFunc[i](msg);
	            }
	        };
	
	        if ( supportPostMessage ){
	            if ( 'addEventListener' in document ) {
	                window.addEventListener('message', generalCallback, false);
	            } else if ( 'attachEvent' in document ) {
	                window.attachEvent('onmessage', generalCallback);
	            }
	        } else {
	            // 兼容IE 6/7
	            window.navigator[prefix + this.name] = generalCallback;
	        }
	    };
	
	    // 监听消息
	    Messenger.prototype.listen = function(callback){
	        this.listenFunc.push(callback);
	    };
	    // 注销监听
	    Messenger.prototype.clear = function(){
	        this.listenFunc = [];
	    };
	    // 广播消息
	    Messenger.prototype.send = function(msg){
	        var targets = this.targets,
	            target;
	        for(target in targets){
	            if(targets.hasOwnProperty(target)){
	                targets[target].send(msg);
	            }
	        }
	    };
	
	    return Messenger;
	
	})();


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(10);
	module.exports.Mask = __webpack_require__(29);


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1),
	    Overlay = __webpack_require__(10),
	    
	    
	    ua = (window.navigator.userAgent || "").toLowerCase(),
	    isIE6 = ua.indexOf("msie 6") !== -1,
	    
	    
	    body = $(document.body),
	    doc = $(document);
	
	
	// Mask
	// ----------
	// 全屏遮罩层组件
	var Mask = Overlay.extend({
	
	  attrs: {
	    width: isIE6 ? doc.outerWidth(true) : '100%',
	    height: isIE6 ? doc.outerHeight(true) : '100%',
	
	    className: 'ui-mask',
	    opacity: 0.2,
	    backgroundColor: '#000',
	    style: {
	      position: isIE6 ? 'absolute' : 'fixed',
	      top: 0,
	      left: 0
	    },
	
	    align: {
	      // undefined 表示相对于当前可视范围定位
	      baseElement: isIE6 ? body : undefined
	    }
	  },
	
	  show: function () {
	    if (isIE6) {
	      this.set('width', doc.outerWidth(true));
	      this.set('height', doc.outerHeight(true));
	    }
	    return Mask.superclass.show.call(this);
	  },
	
	  _onRenderBackgroundColor: function (val) {
	    this.element.css('backgroundColor', val);
	  },
	
	  _onRenderOpacity: function (val) {
	    this.element.css('opacity', val);
	  }
	});
	
	// 单例
	module.exports = new Mask();

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1);
	var Handlebars = __webpack_require__(35)['default'];
	
	var compiledTemplates = {};
	
	// 提供 Template 模板支持，默认引擎是 Handlebars
	module.exports = {
	
	  // Handlebars 的 helpers
	  templateHelpers: null,
	
	  // Handlebars 的 partials
	  templatePartials: null,
	
	  // template 对应的 DOM-like object
	  templateObject: null,
	
	  // 根据配置的模板和传入的数据，构建 this.element 和 templateElement
	  parseElementFromTemplate: function () {
	    // template 支持 id 选择器
	    var t, template = this.get('template');
	    if (/^#/.test(template) && (t = document.getElementById(template.substring(1)))) {
	      template = t.innerHTML;
	      this.set('template', template);
	    }
	    this.templateObject = convertTemplateToObject(template);
	    this.element = $(this.compile());
	  },
	
	  // 编译模板，混入数据，返回 html 结果
	  compile: function (template, model) {
	    template || (template = this.get('template'));
	
	    model || (model = this.get('model')) || (model = {});
	    if (model.toJSON) {
	      model = model.toJSON();
	    }
	
	    // handlebars runtime，注意 partials 也需要预编译
	    if (isFunction(template)) {
	      return template(model, {
	        helpers: this.templateHelpers,
	        partials: precompile(this.templatePartials)
	      });
	    } else {
	      var helpers = this.templateHelpers;
	      var partials = this.templatePartials;
	      var helper, partial;
	
	      // 注册 helpers
	      if (helpers) {
	        for (helper in helpers) {
	          if (helpers.hasOwnProperty(helper)) {
	            Handlebars.registerHelper(helper, helpers[helper]);
	          }
	        }
	      }
	      // 注册 partials
	      if (partials) {
	        for (partial in partials) {
	          if (partials.hasOwnProperty(partial)) {
	            Handlebars.registerPartial(partial, partials[partial]);
	          }
	        }
	      }
	
	      var compiledTemplate = compiledTemplates[template];
	      if (!compiledTemplate) {
	        compiledTemplate = compiledTemplates[template] = Handlebars.compile(template);
	      }
	
	      // 生成 html
	      var html = compiledTemplate(model);
	
	      // 卸载 helpers
	      if (helpers) {
	        for (helper in helpers) {
	          if (helpers.hasOwnProperty(helper)) {
	            delete Handlebars.helpers[helper];
	          }
	        }
	      }
	      // 卸载 partials
	      if (partials) {
	        for (partial in partials) {
	          if (partials.hasOwnProperty(partial)) {
	            delete Handlebars.partials[partial];
	          }
	        }
	      }
	      return html;
	    }
	  },
	
	  // 刷新 selector 指定的局部区域
	  renderPartial: function (selector) {
	    if (this.templateObject) {
	      var template = convertObjectToTemplate(this.templateObject, selector);
	
	      if (template) {
	        if (selector) {
	          this.$(selector).html(this.compile(template));
	        } else {
	          this.element.html(this.compile(template));
	        }
	      } else {
	        this.element.html(this.compile());
	      }
	    }
	
	    // 如果 template 已经编译过了，templateObject 不存在
	    else {
	      var all = $(this.compile());
	      var selected = all.find(selector);
	      if (selected.length) {
	        this.$(selector).html(selected.html());
	      } else {
	        this.element.html(all.html());
	      }
	    }
	
	    return this;
	  }
	};
	
	
	// Helpers
	// -------
	var _compile = Handlebars.compile;
	
	Handlebars.compile = function (template) {
	  return isFunction(template) ? template : _compile.call(Handlebars, template);
	};
	
	// 将 template 字符串转换成对应的 DOM-like object
	
	
	function convertTemplateToObject(template) {
	  return isFunction(template) ? null : $(encode(template));
	}
	
	// 根据 selector 得到 DOM-like template object，并转换为 template 字符串
	
	
	function convertObjectToTemplate(templateObject, selector) {
	  if (!templateObject) return;
	
	  var element;
	  if (selector) {
	    element = templateObject.find(selector);
	    if (element.length === 0) {
	      throw new Error('Invalid template selector: ' + selector);
	    }
	  } else {
	    element = templateObject;
	  }
	  return decode(element.html());
	}
	
	function encode(template) {
	  return template
	  // 替换 {{xxx}} 为 <!-- {{xxx}} -->
	  .replace(/({[^}]+}})/g, '<!--$1-->')
	  // 替换 src="{{xxx}}" 为 data-TEMPLATABLE-src="{{xxx}}"
	  .replace(/\s(src|href)\s*=\s*(['"])(.*?\{.+?)\2/g, ' data-templatable-$1=$2$3$2');
	}
	
	function decode(template) {
	  return template.replace(/(?:<|&lt;)!--({{[^}]+}})--(?:>|&gt;)/g, '$1').replace(/data-templatable-/ig, '');
	}
	
	function isFunction(obj) {
	  return typeof obj === "function";
	}
	
	function precompile(partials) {
	  if (!partials) return {};
	
	  var result = {};
	  for (var name in partials) {
	    var partial = partials[name];
	    result[name] = isFunction(partial) ? partial : Handlebars.compile(partial);
	  }
	  return result;
	};
	
	// 调用 renderPartial 时，Templatable 对模板有一个约束：
	// ** template 自身必须是有效的 html 代码片段**，比如
	//   1. 代码闭合
	//   2. 嵌套符合规范
	//
	// 总之，要保证在 template 里，将 `{{...}}` 转换成注释后，直接 innerHTML 插入到
	// DOM 中，浏览器不会自动增加一些东西。比如：
	//
	// tbody 里没有 tr：
	//  `<table><tbody>{{#each items}}<td>{{this}}</td>{{/each}}</tbody></table>`
	//
	// 标签不闭合：
	//  `<div><span>{{name}}</div>`


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1)
	var DATA_WIDGET_AUTO_RENDERED = 'data-widget-auto-rendered'
	
	
	// 自动渲染接口，子类可根据自己的初始化逻辑进行覆盖
	exports.autoRender = function(config) {
	  return new this(config).render()
	}
	
	
	// 根据 data-widget 属性，自动渲染所有开启了 data-api 的 widget 组件
	exports.autoRenderAll = function(root, callback) {
	  if (typeof root === 'function') {
	    callback = root
	    root = null
	  }
	
	  root = $(root || document.body)
	  var modules = []
	  var elements = []
	
	  root.find('[data-widget]').each(function(i, element) {
	    if (!exports.isDataApiOff(element)) {
	      modules.push(element.getAttribute('data-widget').toLowerCase())
	      elements.push(element)
	    }
	  })
	
	  if (modules.length) {
	    seajs.use(modules, function() {
	
	      for (var i = 0; i < arguments.length; i++) {
	        var SubWidget = arguments[i]
	        var element = $(elements[i])
	
	        // 已经渲染过
	        if (element.attr(DATA_WIDGET_AUTO_RENDERED)) continue
	
	        var config = {
	          initElement: element,
	          renderType: 'auto'
	        };
	
	        // data-widget-role 是指将当前的 DOM 作为 role 的属性去实例化，默认的 role 为 element
	        var role = element.attr('data-widget-role')
	        config[role ? role : 'element'] = element
	
	        // 调用自动渲染接口
	        SubWidget.autoRender && SubWidget.autoRender(config)
	
	        // 标记已经渲染过
	        element.attr(DATA_WIDGET_AUTO_RENDERED, 'true')
	      }
	
	      // 在所有自动渲染完成后，执行回调
	      callback && callback()
	    })
	  }
	}
	
	
	var isDefaultOff = $(document.body).attr('data-api') === 'off'
	
	// 是否没开启 data-api
	exports.isDataApiOff = function(element) {
	  var elementDataApi = $(element).attr('data-api')
	
	  // data-api 默认开启，关闭只有两种方式：
	  //  1. element 上有 data-api="off"，表示关闭单个
	  //  2. document.body 上有 data-api="off"，表示关闭所有
	  return  elementDataApi === 'off' ||
	      (elementDataApi !== 'on' && isDefaultOff)
	}
	


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// DAParser
	// --------
	// data api 解析器，提供对单个 element 的解析，可用来初始化页面中的所有 Widget 组件。
	
	var $ = __webpack_require__(1)
	
	
	// 得到某个 DOM 元素的 dataset
	exports.parseElement = function(element, raw) {
	  element = $(element)[0]
	  var dataset = {}
	
	  // ref: https://developer.mozilla.org/en/DOM/element.dataset
	  if (element.dataset) {
	    // 转换成普通对象
	    dataset = $.extend({}, element.dataset)
	  }
	  else {
	    var attrs = element.attributes
	
	    for (var i = 0, len = attrs.length; i < len; i++) {
	      var attr = attrs[i]
	      var name = attr.name
	
	      if (name.indexOf('data-') === 0) {
	        name = camelCase(name.substring(5))
	        dataset[name] = attr.value
	      }
	    }
	  }
	
	  return raw === true ? dataset : normalizeValues(dataset)
	}
	
	
	// Helpers
	// ------
	
	var RE_DASH_WORD = /-([a-z])/g
	var JSON_LITERAL_PATTERN = /^\s*[\[{].*[\]}]\s*$/
	var parseJSON = this.JSON ? JSON.parse : $.parseJSON
	
	// 仅处理字母开头的，其他情况转换为小写："data-x-y-123-_A" --> xY-123-_a
	function camelCase(str) {
	  return str.toLowerCase().replace(RE_DASH_WORD, function(all, letter) {
	    return (letter + '').toUpperCase()
	  })
	}
	
	// 解析并归一化配置中的值
	function normalizeValues(data) {
	  for (var key in data) {
	    if (data.hasOwnProperty(key)) {
	
	      var val = data[key]
	      if (typeof val !== 'string') continue
	
	      if (JSON_LITERAL_PATTERN.test(val)) {
	        val = val.replace(/'/g, '"')
	        data[key] = normalizeValues(parseJSON(val))
	      }
	      else {
	        data[key] = normalizeValue(val)
	      }
	    }
	  }
	
	  return data
	}
	
	// 将 'false' 转换为 false
	// 'true' 转换为 true
	// '3253.34' 转换为 3253.34
	function normalizeValue(val) {
	  if (val.toLowerCase() === 'false') {
	    val = false
	  }
	  else if (val.toLowerCase() === 'true') {
	    val = true
	  }
	  else if (/\d/.test(val) && /[^a-z]/i.test(val)) {
	    var number = parseFloat(val)
	    if (number + '' === val) {
	      val = number
	    }
	  }
	
	  return val
	}


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// Widget
	// ---------
	// Widget 是与 DOM 元素相关联的非工具类组件，主要负责 View 层的管理。
	// Widget 组件具有四个要素：描述状态的 attributes 和 properties，描述行为的 events
	// 和 methods。Widget 基类约定了这四要素创建时的基本流程和最佳实践。
	
	var Base = __webpack_require__(21)
	var $ = __webpack_require__(1)
	var DAParser = __webpack_require__(32)
	var AutoRender = __webpack_require__(31)
	
	var DELEGATE_EVENT_NS = '.delegate-events-'
	var ON_RENDER = '_onRender'
	var DATA_WIDGET_CID = 'data-widget-cid'
	
	// 所有初始化过的 Widget 实例
	var cachedInstances = {}
	
	var Widget = Base.extend({
	
	  // config 中的这些键值会直接添加到实例上，转换成 properties
	  propsInAttrs: ['initElement', 'element', 'events'],
	
	  // 与 widget 关联的 DOM 元素
	  element: null,
	
	  // 事件代理，格式为：
	  //   {
	  //     'mousedown .title': 'edit',
	  //     'click {{attrs.saveButton}}': 'save'
	  //     'click .open': function(ev) { ... }
	  //   }
	  events: null,
	
	  // 属性列表
	  attrs: {
	    // 基本属性
	    id: null,
	    className: null,
	    style: null,
	
	    // 默认模板
	    template: '<div></div>',
	
	    // 默认数据模型
	    model: null,
	
	    // 组件的默认父节点
	    parentNode: document.body
	  },
	
	  // 初始化方法，确定组件创建时的基本流程：
	  // 初始化 attrs --》 初始化 props --》 初始化 events --》 子类的初始化
	  initialize: function(config) {
	    this.cid = uniqueCid()
	
	    // 初始化 attrs
	    var dataAttrsConfig = this._parseDataAttrsConfig(config)
	    Widget.superclass.initialize.call(this, config ? $.extend(dataAttrsConfig, config) : dataAttrsConfig)
	
	    // 初始化 props
	    this.parseElement()
	    this.initProps()
	
	    // 初始化 events
	    this.delegateEvents()
	
	    // 子类自定义的初始化
	    this.setup()
	
	    // 保存实例信息
	    this._stamp()
	
	    // 是否由 template 初始化
	    this._isTemplate = !(config && config.element)
	  },
	
	  // 解析通过 data-attr 设置的 api
	  _parseDataAttrsConfig: function(config) {
	    var element, dataAttrsConfig
	    if (config) {
	      element = config.initElement ? $(config.initElement) : $(config.element)
	    }
	
	    // 解析 data-api 时，只考虑用户传入的 element，不考虑来自继承或从模板构建的
	    if (element && element[0] && !AutoRender.isDataApiOff(element)) {
	      dataAttrsConfig = DAParser.parseElement(element)
	    }
	
	    return dataAttrsConfig
	  },
	
	  // 构建 this.element
	  parseElement: function() {
	    var element = this.element
	
	    if (element) {
	      this.element = $(element)
	    }
	    // 未传入 element 时，从 template 构建
	    else if (this.get('template')) {
	      this.parseElementFromTemplate()
	    }
	
	    // 如果对应的 DOM 元素不存在，则报错
	    if (!this.element || !this.element[0]) {
	      throw new Error('element is invalid')
	    }
	  },
	
	  // 从模板中构建 this.element
	  parseElementFromTemplate: function() {
	    this.element = $(this.get('template'))
	  },
	
	  // 负责 properties 的初始化，提供给子类覆盖
	  initProps: function() {
	  },
	
	  // 注册事件代理
	  delegateEvents: function(element, events, handler) {
	    var argus = trimRightUndefine(Array.prototype.slice.call(arguments));
	    // widget.delegateEvents()
	    if (argus.length === 0) {
	      events = getEvents(this)
	      element = this.element
	    }
	
	    // widget.delegateEvents({
	    //   'click p': 'fn1',
	    //   'click li': 'fn2'
	    // })
	    else if (argus.length === 1) {
	      events = element
	      element = this.element
	    }
	
	    // widget.delegateEvents('click p', function(ev) { ... })
	    else if (argus.length === 2) {
	      handler = events
	      events = element
	      element = this.element
	    }
	
	    // widget.delegateEvents(element, 'click p', function(ev) { ... })
	    else {
	      element || (element = this.element)
	      this._delegateElements || (this._delegateElements = [])
	      this._delegateElements.push($(element))
	    }
	
	    // 'click p' => {'click p': handler}
	    if (isString(events) && isFunction(handler)) {
	      var o = {}
	      o[events] = handler
	      events = o
	    }
	
	    // key 为 'event selector'
	    for (var key in events) {
	      if (!events.hasOwnProperty(key)) continue
	
	      var args = parseEventKey(key, this)
	      var eventType = args.type
	      var selector = args.selector
	
	      ;(function(handler, widget) {
	
	        var callback = function(ev) {
	          if (isFunction(handler)) {
	            handler.call(widget, ev)
	          } else {
	            widget[handler](ev)
	          }
	        }
	
	        // delegate
	        if (selector) {
	          $(element).on(eventType, selector, callback)
	        }
	        // normal bind
	        // 分开写是为了兼容 zepto，zepto 的判断不如 jquery 强劲有力
	        else {
	          $(element).on(eventType, callback)
	        }
	
	      })(events[key], this)
	    }
	
	    return this
	  },
	
	  // 卸载事件代理
	  undelegateEvents: function(element, eventKey) {
	    var argus = trimRightUndefine(Array.prototype.slice.call(arguments));
	
	    if (!eventKey) {
	      eventKey = element
	      element = null
	    }
	
	    // 卸载所有
	    // .undelegateEvents()
	    if (argus.length === 0) {
	      var type = DELEGATE_EVENT_NS + this.cid
	
	      this.element && this.element.off(type)
	
	      // 卸载所有外部传入的 element
	      if (this._delegateElements) {
	        for (var de in this._delegateElements) {
	          if (!this._delegateElements.hasOwnProperty(de)) continue
	          this._delegateElements[de].off(type)
	        }
	      }
	
	    } else {
	      var args = parseEventKey(eventKey, this)
	
	      // 卸载 this.element
	      // .undelegateEvents(events)
	      if (!element) {
	        this.element && this.element.off(args.type, args.selector)
	      }
	
	      // 卸载外部 element
	      // .undelegateEvents(element, events)
	      else {
	        $(element).off(args.type, args.selector)
	      }
	    }
	    return this
	  },
	
	  // 提供给子类覆盖的初始化方法
	  setup: function() {
	  },
	
	  // 将 widget 渲染到页面上
	  // 渲染不仅仅包括插入到 DOM 树中，还包括样式渲染等
	  // 约定：子类覆盖时，需保持 `return this`
	  render: function() {
	
	    // 让渲染相关属性的初始值生效，并绑定到 change 事件
	    if (!this.rendered) {
	      this._renderAndBindAttrs()
	      this.rendered = true
	    }
	
	    // 插入到文档流中
	    var parentNode = this.get('parentNode')
	    if (parentNode && !isInDocument(this.element[0])) {
	      // 隔离样式，添加统一的命名空间
	      // https://github.com/aliceui/aliceui.org/issues/9
	      var outerBoxClass = this.constructor.outerBoxClass
	      if (outerBoxClass) {
	        var outerBox = this._outerBox = $('<div></div>').addClass(outerBoxClass)
	        outerBox.append(this.element).appendTo(parentNode)
	      } else {
	        this.element.appendTo(parentNode)
	      }
	    }
	
	    return this
	  },
	
	  // 让属性的初始值生效，并绑定到 change:attr 事件上
	  _renderAndBindAttrs: function() {
	    var widget = this
	    var attrs = widget.attrs
	
	    for (var attr in attrs) {
	      if (!attrs.hasOwnProperty(attr)) continue
	      var m = ON_RENDER + ucfirst(attr)
	
	      if (this[m]) {
	        var val = this.get(attr)
	
	        // 让属性的初始值生效。注：默认空值不触发
	        if (!isEmptyAttrValue(val)) {
	          this[m](val, undefined, attr)
	        }
	
	        // 将 _onRenderXx 自动绑定到 change:xx 事件上
	        (function(m) {
	          widget.on('change:' + attr, function(val, prev, key) {
	            widget[m](val, prev, key)
	          })
	        })(m)
	      }
	    }
	  },
	
	  _onRenderId: function(val) {
	    this.element.attr('id', val)
	  },
	
	  _onRenderClassName: function(val) {
	    this.element.addClass(val)
	  },
	
	  _onRenderStyle: function(val) {
	    this.element.css(val)
	  },
	
	  // 让 element 与 Widget 实例建立关联
	  _stamp: function() {
	    var cid = this.cid;
	
	    (this.initElement || this.element).attr(DATA_WIDGET_CID, cid)
	    cachedInstances[cid] = this
	  },
	
	  // 在 this.element 内寻找匹配节点
	  $: function(selector) {
	    return this.element.find(selector)
	  },
	
	  destroy: function() {
	    this.undelegateEvents()
	    delete cachedInstances[this.cid]
	
	    // For memory leak
	    if (this.element && this._isTemplate) {
	      this.element.off()
	      // 如果是 widget 生成的 element 则去除
	      if (this._outerBox) {
	        this._outerBox.remove()
	      } else {
	        this.element.remove()
	      }
	    }
	    this.element = null
	
	    Widget.superclass.destroy.call(this)
	  }
	})
	
	// For memory leak
	$(window).unload(function() {
	  for(var cid in cachedInstances) {
	    cachedInstances[cid].destroy()
	  }
	})
	
	// 查询与 selector 匹配的第一个 DOM 节点，得到与该 DOM 节点相关联的 Widget 实例
	Widget.query = function(selector) {
	  var element = $(selector).eq(0)
	  var cid
	
	  element && (cid = element.attr(DATA_WIDGET_CID))
	  return cachedInstances[cid]
	}
	
	
	Widget.autoRender = AutoRender.autoRender
	Widget.autoRenderAll = AutoRender.autoRenderAll
	Widget.StaticsWhiteList = ['autoRender']
	
	module.exports = Widget
	
	
	// Helpers
	// ------
	
	var toString = Object.prototype.toString
	var cidCounter = 0
	
	function uniqueCid() {
	  return 'widget-' + cidCounter++
	}
	
	function isString(val) {
	  return toString.call(val) === '[object String]'
	}
	
	function isFunction(val) {
	  return toString.call(val) === '[object Function]'
	}
	
	// Zepto 上没有 contains 方法
	var contains = $.contains || function(a, b) {
	  //noinspection JSBitwiseOperatorUsage
	  return !!(a.compareDocumentPosition(b) & 16)
	}
	
	function isInDocument(element) {
	  return contains(document.documentElement, element)
	}
	
	function ucfirst(str) {
	  return str.charAt(0).toUpperCase() + str.substring(1)
	}
	
	
	var EVENT_KEY_SPLITTER = /^(\S+)\s*(.*)$/
	var EXPRESSION_FLAG = /{{([^}]+)}}/g
	var INVALID_SELECTOR = 'INVALID_SELECTOR'
	
	function getEvents(widget) {
	  if (isFunction(widget.events)) {
	    widget.events = widget.events()
	  }
	  return widget.events
	}
	
	function parseEventKey(eventKey, widget) {
	  var match = eventKey.match(EVENT_KEY_SPLITTER)
	  var eventType = match[1] + DELEGATE_EVENT_NS + widget.cid
	
	  // 当没有 selector 时，需要设置为 undefined，以使得 zepto 能正确转换为 bind
	  var selector = match[2] || undefined
	
	  if (selector && selector.indexOf('{{') > -1) {
	    selector = parseExpressionInEventKey(selector, widget)
	  }
	
	  return {
	    type: eventType,
	    selector: selector
	  }
	}
	
	// 解析 eventKey 中的 {{xx}}, {{yy}}
	function parseExpressionInEventKey(selector, widget) {
	
	  return selector.replace(EXPRESSION_FLAG, function(m, name) {
	    var parts = name.split('.')
	    var point = widget, part
	
	    while (part = parts.shift()) {
	      if (point === widget.attrs) {
	        point = widget.get(part)
	      } else {
	        point = point[part]
	      }
	    }
	
	    // 已经是 className，比如来自 dataset 的
	    if (isString(point)) {
	      return point
	    }
	
	    // 不能识别的，返回无效标识
	    return INVALID_SELECTOR
	  })
	}
	
	
	// 对于 attrs 的 value 来说，以下值都认为是空值： null, undefined
	function isEmptyAttrValue(o) {
	  return o == null || o === undefined
	}
	
	function trimRightUndefine(argus) {
	  for (var i = argus.length - 1; i >= 0; i--) {
	    if (argus[i] === undefined) {
	      argus.pop();
	    } else {
	      break;
	    }
	  }
	  return argus;
	}


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(33)


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*globals Handlebars: true */
	var Handlebars = __webpack_require__(36)["default"];
	
	// Compiler imports
	var AST = __webpack_require__(11)["default"];
	var Parser = __webpack_require__(12).parser;
	var parse = __webpack_require__(12).parse;
	var Compiler = __webpack_require__(4).Compiler;
	var compile = __webpack_require__(4).compile;
	var precompile = __webpack_require__(4).precompile;
	var JavaScriptCompiler = __webpack_require__(37)["default"];
	
	var _create = Handlebars.create;
	var create = function() {
	  var hb = _create();
	
	  hb.compile = function(input, options) {
	    return compile(input, options, hb);
	  };
	  hb.precompile = function (input, options) {
	    return precompile(input, options, hb);
	  };
	
	  hb.AST = AST;
	  hb.Compiler = Compiler;
	  hb.JavaScriptCompiler = JavaScriptCompiler;
	  hb.Parser = Parser;
	  hb.parse = parse;
	
	  return hb;
	};
	
	Handlebars = create();
	Handlebars.create = create;
	
	exports["default"] = Handlebars;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*globals Handlebars: true */
	var base = __webpack_require__(2);
	
	// Each of these augment the Handlebars object. No need to setup here.
	// (This is done to easily share code between commonjs and browse envs)
	var SafeString = __webpack_require__(13)["default"];
	var Exception = __webpack_require__(3)["default"];
	var Utils = __webpack_require__(5);
	var runtime = __webpack_require__(39);
	
	// For compatibility and usage outside of module systems, make the Handlebars object a namespace
	var create = function() {
	  var hb = new base.HandlebarsEnvironment();
	
	  Utils.extend(hb, base);
	  hb.SafeString = SafeString;
	  hb.Exception = Exception;
	  hb.Utils = Utils;
	
	  hb.VM = runtime;
	  hb.template = function(spec) {
	    return runtime.template(spec, hb);
	  };
	
	  return hb;
	};
	
	var Handlebars = create();
	Handlebars.create = create;
	
	exports["default"] = Handlebars;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var COMPILER_REVISION = __webpack_require__(2).COMPILER_REVISION;
	var REVISION_CHANGES = __webpack_require__(2).REVISION_CHANGES;
	var log = __webpack_require__(2).log;
	var Exception = __webpack_require__(3)["default"];
	
	function Literal(value) {
	  this.value = value;
	}
	
	function JavaScriptCompiler() {}
	
	JavaScriptCompiler.prototype = {
	  // PUBLIC API: You can override these methods in a subclass to provide
	  // alternative compiled forms for name lookup and buffering semantics
	  nameLookup: function(parent, name /* , type*/) {
	    var wrap,
	        ret;
	    if (parent.indexOf('depth') === 0) {
	      wrap = true;
	    }
	
	    if (/^[0-9]+$/.test(name)) {
	      ret = parent + "[" + name + "]";
	    } else if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
	      ret = parent + "." + name;
	    }
	    else {
	      ret = parent + "['" + name + "']";
	    }
	
	    if (wrap) {
	      return '(' + parent + ' && ' + ret + ')';
	    } else {
	      return ret;
	    }
	  },
	
	  compilerInfo: function() {
	    var revision = COMPILER_REVISION,
	        versions = REVISION_CHANGES[revision];
	    return "this.compilerInfo = ["+revision+",'"+versions+"'];\n";
	  },
	
	  appendToBuffer: function(string) {
	    if (this.environment.isSimple) {
	      return "return " + string + ";";
	    } else {
	      return {
	        appendToBuffer: true,
	        content: string,
	        toString: function() { return "buffer += " + string + ";"; }
	      };
	    }
	  },
	
	  initializeBuffer: function() {
	    return this.quotedString("");
	  },
	
	  namespace: "Handlebars",
	  // END PUBLIC API
	
	  compile: function(environment, options, context, asObject) {
	    this.environment = environment;
	    this.options = options || {};
	
	    log('debug', this.environment.disassemble() + "\n\n");
	
	    this.name = this.environment.name;
	    this.isChild = !!context;
	    this.context = context || {
	      programs: [],
	      environments: [],
	      aliases: { }
	    };
	
	    this.preamble();
	
	    this.stackSlot = 0;
	    this.stackVars = [];
	    this.registers = { list: [] };
	    this.hashes = [];
	    this.compileStack = [];
	    this.inlineStack = [];
	
	    this.compileChildren(environment, options);
	
	    var opcodes = environment.opcodes, opcode;
	
	    this.i = 0;
	
	    for(var l=opcodes.length; this.i<l; this.i++) {
	      opcode = opcodes[this.i];
	
	      if(opcode.opcode === 'DECLARE') {
	        this[opcode.name] = opcode.value;
	      } else {
	        this[opcode.opcode].apply(this, opcode.args);
	      }
	
	      // Reset the stripNext flag if it was not set by this operation.
	      if (opcode.opcode !== this.stripNext) {
	        this.stripNext = false;
	      }
	    }
	
	    // Flush any trailing content that might be pending.
	    this.pushSource('');
	
	    if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
	      throw new Exception('Compile completed with content left on stack');
	    }
	
	    return this.createFunctionContext(asObject);
	  },
	
	  preamble: function() {
	    var out = [];
	
	    if (!this.isChild) {
	      var namespace = this.namespace;
	
	      var copies = "helpers = this.merge(helpers, " + namespace + ".helpers);";
	      if (this.environment.usePartial) { copies = copies + " partials = this.merge(partials, " + namespace + ".partials);"; }
	      if (this.options.data) { copies = copies + " data = data || {};"; }
	      out.push(copies);
	    } else {
	      out.push('');
	    }
	
	    if (!this.environment.isSimple) {
	      out.push(", buffer = " + this.initializeBuffer());
	    } else {
	      out.push("");
	    }
	
	    // track the last context pushed into place to allow skipping the
	    // getContext opcode when it would be a noop
	    this.lastContext = 0;
	    this.source = out;
	  },
	
	  createFunctionContext: function(asObject) {
	    var locals = this.stackVars.concat(this.registers.list);
	
	    if(locals.length > 0) {
	      this.source[1] = this.source[1] + ", " + locals.join(", ");
	    }
	
	    // Generate minimizer alias mappings
	    if (!this.isChild) {
	      for (var alias in this.context.aliases) {
	        if (this.context.aliases.hasOwnProperty(alias)) {
	          this.source[1] = this.source[1] + ', ' + alias + '=' + this.context.aliases[alias];
	        }
	      }
	    }
	
	    if (this.source[1]) {
	      this.source[1] = "var " + this.source[1].substring(2) + ";";
	    }
	
	    // Merge children
	    if (!this.isChild) {
	      this.source[1] += '\n' + this.context.programs.join('\n') + '\n';
	    }
	
	    if (!this.environment.isSimple) {
	      this.pushSource("return buffer;");
	    }
	
	    var params = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];
	
	    for(var i=0, l=this.environment.depths.list.length; i<l; i++) {
	      params.push("depth" + this.environment.depths.list[i]);
	    }
	
	    // Perform a second pass over the output to merge content when possible
	    var source = this.mergeSource();
	
	    if (!this.isChild) {
	      source = this.compilerInfo()+source;
	    }
	
	    if (asObject) {
	      params.push(source);
	
	      return Function.apply(this, params);
	    } else {
	      var functionSource = 'function ' + (this.name || '') + '(' + params.join(',') + ') {\n  ' + source + '}';
	      log('debug', functionSource + "\n\n");
	      return functionSource;
	    }
	  },
	  mergeSource: function() {
	    // WARN: We are not handling the case where buffer is still populated as the source should
	    // not have buffer append operations as their final action.
	    var source = '',
	        buffer;
	    for (var i = 0, len = this.source.length; i < len; i++) {
	      var line = this.source[i];
	      if (line.appendToBuffer) {
	        if (buffer) {
	          buffer = buffer + '\n    + ' + line.content;
	        } else {
	          buffer = line.content;
	        }
	      } else {
	        if (buffer) {
	          source += 'buffer += ' + buffer + ';\n  ';
	          buffer = undefined;
	        }
	        source += line + '\n  ';
	      }
	    }
	    return source;
	  },
	
	  // [blockValue]
	  //
	  // On stack, before: hash, inverse, program, value
	  // On stack, after: return value of blockHelperMissing
	  //
	  // The purpose of this opcode is to take a block of the form
	  // `{{#foo}}...{{/foo}}`, resolve the value of `foo`, and
	  // replace it on the stack with the result of properly
	  // invoking blockHelperMissing.
	  blockValue: function() {
	    this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';
	
	    var params = ["depth0"];
	    this.setupParams(0, params);
	
	    this.replaceStack(function(current) {
	      params.splice(1, 0, current);
	      return "blockHelperMissing.call(" + params.join(", ") + ")";
	    });
	  },
	
	  // [ambiguousBlockValue]
	  //
	  // On stack, before: hash, inverse, program, value
	  // Compiler value, before: lastHelper=value of last found helper, if any
	  // On stack, after, if no lastHelper: same as [blockValue]
	  // On stack, after, if lastHelper: value
	  ambiguousBlockValue: function() {
	    this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';
	
	    var params = ["depth0"];
	    this.setupParams(0, params);
	
	    var current = this.topStack();
	    params.splice(1, 0, current);
	
	    this.pushSource("if (!" + this.lastHelper + ") { " + current + " = blockHelperMissing.call(" + params.join(", ") + "); }");
	  },
	
	  // [appendContent]
	  //
	  // On stack, before: ...
	  // On stack, after: ...
	  //
	  // Appends the string value of `content` to the current buffer
	  appendContent: function(content) {
	    if (this.pendingContent) {
	      content = this.pendingContent + content;
	    }
	    if (this.stripNext) {
	      content = content.replace(/^\s+/, '');
	    }
	
	    this.pendingContent = content;
	  },
	
	  // [strip]
	  //
	  // On stack, before: ...
	  // On stack, after: ...
	  //
	  // Removes any trailing whitespace from the prior content node and flags
	  // the next operation for stripping if it is a content node.
	  strip: function() {
	    if (this.pendingContent) {
	      this.pendingContent = this.pendingContent.replace(/\s+$/, '');
	    }
	    this.stripNext = 'strip';
	  },
	
	  // [append]
	  //
	  // On stack, before: value, ...
	  // On stack, after: ...
	  //
	  // Coerces `value` to a String and appends it to the current buffer.
	  //
	  // If `value` is truthy, or 0, it is coerced into a string and appended
	  // Otherwise, the empty string is appended
	  append: function() {
	    // Force anything that is inlined onto the stack so we don't have duplication
	    // when we examine local
	    this.flushInline();
	    var local = this.popStack();
	    this.pushSource("if(" + local + " || " + local + " === 0) { " + this.appendToBuffer(local) + " }");
	    if (this.environment.isSimple) {
	      this.pushSource("else { " + this.appendToBuffer("''") + " }");
	    }
	  },
	
	  // [appendEscaped]
	  //
	  // On stack, before: value, ...
	  // On stack, after: ...
	  //
	  // Escape `value` and append it to the buffer
	  appendEscaped: function() {
	    this.context.aliases.escapeExpression = 'this.escapeExpression';
	
	    this.pushSource(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"));
	  },
	
	  // [getContext]
	  //
	  // On stack, before: ...
	  // On stack, after: ...
	  // Compiler value, after: lastContext=depth
	  //
	  // Set the value of the `lastContext` compiler value to the depth
	  getContext: function(depth) {
	    if(this.lastContext !== depth) {
	      this.lastContext = depth;
	    }
	  },
	
	  // [lookupOnContext]
	  //
	  // On stack, before: ...
	  // On stack, after: currentContext[name], ...
	  //
	  // Looks up the value of `name` on the current context and pushes
	  // it onto the stack.
	  lookupOnContext: function(name) {
	    this.push(this.nameLookup('depth' + this.lastContext, name, 'context'));
	  },
	
	  // [pushContext]
	  //
	  // On stack, before: ...
	  // On stack, after: currentContext, ...
	  //
	  // Pushes the value of the current context onto the stack.
	  pushContext: function() {
	    this.pushStackLiteral('depth' + this.lastContext);
	  },
	
	  // [resolvePossibleLambda]
	  //
	  // On stack, before: value, ...
	  // On stack, after: resolved value, ...
	  //
	  // If the `value` is a lambda, replace it on the stack by
	  // the return value of the lambda
	  resolvePossibleLambda: function() {
	    this.context.aliases.functionType = '"function"';
	
	    this.replaceStack(function(current) {
	      return "typeof " + current + " === functionType ? " + current + ".apply(depth0) : " + current;
	    });
	  },
	
	  // [lookup]
	  //
	  // On stack, before: value, ...
	  // On stack, after: value[name], ...
	  //
	  // Replace the value on the stack with the result of looking
	  // up `name` on `value`
	  lookup: function(name) {
	    this.replaceStack(function(current) {
	      return current + " == null || " + current + " === false ? " + current + " : " + this.nameLookup(current, name, 'context');
	    });
	  },
	
	  // [lookupData]
	  //
	  // On stack, before: ...
	  // On stack, after: data, ...
	  //
	  // Push the data lookup operator
	  lookupData: function() {
	    this.pushStackLiteral('data');
	  },
	
	  // [pushStringParam]
	  //
	  // On stack, before: ...
	  // On stack, after: string, currentContext, ...
	  //
	  // This opcode is designed for use in string mode, which
	  // provides the string value of a parameter along with its
	  // depth rather than resolving it immediately.
	  pushStringParam: function(string, type) {
	    this.pushStackLiteral('depth' + this.lastContext);
	
	    this.pushString(type);
	
	    // If it's a subexpression, the string result
	    // will be pushed after this opcode.
	    if (type !== 'sexpr') {
	      if (typeof string === 'string') {
	        this.pushString(string);
	      } else {
	        this.pushStackLiteral(string);
	      }
	    }
	  },
	
	  emptyHash: function() {
	    this.pushStackLiteral('{}');
	
	    if (this.options.stringParams) {
	      this.push('{}'); // hashContexts
	      this.push('{}'); // hashTypes
	    }
	  },
	  pushHash: function() {
	    if (this.hash) {
	      this.hashes.push(this.hash);
	    }
	    this.hash = {values: [], types: [], contexts: []};
	  },
	  popHash: function() {
	    var hash = this.hash;
	    this.hash = this.hashes.pop();
	
	    if (this.options.stringParams) {
	      this.push('{' + hash.contexts.join(',') + '}');
	      this.push('{' + hash.types.join(',') + '}');
	    }
	
	    this.push('{\n    ' + hash.values.join(',\n    ') + '\n  }');
	  },
	
	  // [pushString]
	  //
	  // On stack, before: ...
	  // On stack, after: quotedString(string), ...
	  //
	  // Push a quoted version of `string` onto the stack
	  pushString: function(string) {
	    this.pushStackLiteral(this.quotedString(string));
	  },
	
	  // [push]
	  //
	  // On stack, before: ...
	  // On stack, after: expr, ...
	  //
	  // Push an expression onto the stack
	  push: function(expr) {
	    this.inlineStack.push(expr);
	    return expr;
	  },
	
	  // [pushLiteral]
	  //
	  // On stack, before: ...
	  // On stack, after: value, ...
	  //
	  // Pushes a value onto the stack. This operation prevents
	  // the compiler from creating a temporary variable to hold
	  // it.
	  pushLiteral: function(value) {
	    this.pushStackLiteral(value);
	  },
	
	  // [pushProgram]
	  //
	  // On stack, before: ...
	  // On stack, after: program(guid), ...
	  //
	  // Push a program expression onto the stack. This takes
	  // a compile-time guid and converts it into a runtime-accessible
	  // expression.
	  pushProgram: function(guid) {
	    if (guid != null) {
	      this.pushStackLiteral(this.programExpression(guid));
	    } else {
	      this.pushStackLiteral(null);
	    }
	  },
	
	  // [invokeHelper]
	  //
	  // On stack, before: hash, inverse, program, params..., ...
	  // On stack, after: result of helper invocation
	  //
	  // Pops off the helper's parameters, invokes the helper,
	  // and pushes the helper's return value onto the stack.
	  //
	  // If the helper is not found, `helperMissing` is called.
	  invokeHelper: function(paramSize, name, isRoot) {
	    this.context.aliases.helperMissing = 'helpers.helperMissing';
	    this.useRegister('helper');
	
	    var helper = this.lastHelper = this.setupHelper(paramSize, name, true);
	    var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');
	
	    var lookup = 'helper = ' + helper.name + ' || ' + nonHelper;
	    if (helper.paramsInit) {
	      lookup += ',' + helper.paramsInit;
	    }
	
	    this.push(
	      '('
	        + lookup
	        + ',helper '
	          + '? helper.call(' + helper.callParams + ') '
	          + ': helperMissing.call(' + helper.helperMissingParams + '))');
	
	    // Always flush subexpressions. This is both to prevent the compounding size issue that
	    // occurs when the code has to be duplicated for inlining and also to prevent errors
	    // due to the incorrect options object being passed due to the shared register.
	    if (!isRoot) {
	      this.flushInline();
	    }
	  },
	
	  // [invokeKnownHelper]
	  //
	  // On stack, before: hash, inverse, program, params..., ...
	  // On stack, after: result of helper invocation
	  //
	  // This operation is used when the helper is known to exist,
	  // so a `helperMissing` fallback is not required.
	  invokeKnownHelper: function(paramSize, name) {
	    var helper = this.setupHelper(paramSize, name);
	    this.push(helper.name + ".call(" + helper.callParams + ")");
	  },
	
	  // [invokeAmbiguous]
	  //
	  // On stack, before: hash, inverse, program, params..., ...
	  // On stack, after: result of disambiguation
	  //
	  // This operation is used when an expression like `{{foo}}`
	  // is provided, but we don't know at compile-time whether it
	  // is a helper or a path.
	  //
	  // This operation emits more code than the other options,
	  // and can be avoided by passing the `knownHelpers` and
	  // `knownHelpersOnly` flags at compile-time.
	  invokeAmbiguous: function(name, helperCall) {
	    this.context.aliases.functionType = '"function"';
	    this.useRegister('helper');
	
	    this.emptyHash();
	    var helper = this.setupHelper(0, name, helperCall);
	
	    var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');
	
	    var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');
	    var nextStack = this.nextStack();
	
	    if (helper.paramsInit) {
	      this.pushSource(helper.paramsInit);
	    }
	    this.pushSource('if (helper = ' + helperName + ') { ' + nextStack + ' = helper.call(' + helper.callParams + '); }');
	    this.pushSource('else { helper = ' + nonHelper + '; ' + nextStack + ' = typeof helper === functionType ? helper.call(' + helper.callParams + ') : helper; }');
	  },
	
	  // [invokePartial]
	  //
	  // On stack, before: context, ...
	  // On stack after: result of partial invocation
	  //
	  // This operation pops off a context, invokes a partial with that context,
	  // and pushes the result of the invocation back.
	  invokePartial: function(name) {
	    var params = [this.nameLookup('partials', name, 'partial'), "'" + name + "'", this.popStack(), "helpers", "partials"];
	
	    if (this.options.data) {
	      params.push("data");
	    }
	
	    this.context.aliases.self = "this";
	    this.push("self.invokePartial(" + params.join(", ") + ")");
	  },
	
	  // [assignToHash]
	  //
	  // On stack, before: value, hash, ...
	  // On stack, after: hash, ...
	  //
	  // Pops a value and hash off the stack, assigns `hash[key] = value`
	  // and pushes the hash back onto the stack.
	  assignToHash: function(key) {
	    var value = this.popStack(),
	        context,
	        type;
	
	    if (this.options.stringParams) {
	      type = this.popStack();
	      context = this.popStack();
	    }
	
	    var hash = this.hash;
	    if (context) {
	      hash.contexts.push("'" + key + "': " + context);
	    }
	    if (type) {
	      hash.types.push("'" + key + "': " + type);
	    }
	    hash.values.push("'" + key + "': (" + value + ")");
	  },
	
	  // HELPERS
	
	  compiler: JavaScriptCompiler,
	
	  compileChildren: function(environment, options) {
	    var children = environment.children, child, compiler;
	
	    for(var i=0, l=children.length; i<l; i++) {
	      child = children[i];
	      compiler = new this.compiler();
	
	      var index = this.matchExistingProgram(child);
	
	      if (index == null) {
	        this.context.programs.push('');     // Placeholder to prevent name conflicts for nested children
	        index = this.context.programs.length;
	        child.index = index;
	        child.name = 'program' + index;
	        this.context.programs[index] = compiler.compile(child, options, this.context);
	        this.context.environments[index] = child;
	      } else {
	        child.index = index;
	        child.name = 'program' + index;
	      }
	    }
	  },
	  matchExistingProgram: function(child) {
	    for (var i = 0, len = this.context.environments.length; i < len; i++) {
	      var environment = this.context.environments[i];
	      if (environment && environment.equals(child)) {
	        return i;
	      }
	    }
	  },
	
	  programExpression: function(guid) {
	    this.context.aliases.self = "this";
	
	    if(guid == null) {
	      return "self.noop";
	    }
	
	    var child = this.environment.children[guid],
	        depths = child.depths.list, depth;
	
	    var programParams = [child.index, child.name, "data"];
	
	    for(var i=0, l = depths.length; i<l; i++) {
	      depth = depths[i];
	
	      if(depth === 1) { programParams.push("depth0"); }
	      else { programParams.push("depth" + (depth - 1)); }
	    }
	
	    return (depths.length === 0 ? "self.program(" : "self.programWithDepth(") + programParams.join(", ") + ")";
	  },
	
	  register: function(name, val) {
	    this.useRegister(name);
	    this.pushSource(name + " = " + val + ";");
	  },
	
	  useRegister: function(name) {
	    if(!this.registers[name]) {
	      this.registers[name] = true;
	      this.registers.list.push(name);
	    }
	  },
	
	  pushStackLiteral: function(item) {
	    return this.push(new Literal(item));
	  },
	
	  pushSource: function(source) {
	    if (this.pendingContent) {
	      this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent)));
	      this.pendingContent = undefined;
	    }
	
	    if (source) {
	      this.source.push(source);
	    }
	  },
	
	  pushStack: function(item) {
	    this.flushInline();
	
	    var stack = this.incrStack();
	    if (item) {
	      this.pushSource(stack + " = " + item + ";");
	    }
	    this.compileStack.push(stack);
	    return stack;
	  },
	
	  replaceStack: function(callback) {
	    var prefix = '',
	        inline = this.isInline(),
	        stack,
	        createdStack,
	        usedLiteral;
	
	    // If we are currently inline then we want to merge the inline statement into the
	    // replacement statement via ','
	    if (inline) {
	      var top = this.popStack(true);
	
	      if (top instanceof Literal) {
	        // Literals do not need to be inlined
	        stack = top.value;
	        usedLiteral = true;
	      } else {
	        // Get or create the current stack name for use by the inline
	        createdStack = !this.stackSlot;
	        var name = !createdStack ? this.topStackName() : this.incrStack();
	
	        prefix = '(' + this.push(name) + ' = ' + top + '),';
	        stack = this.topStack();
	      }
	    } else {
	      stack = this.topStack();
	    }
	
	    var item = callback.call(this, stack);
	
	    if (inline) {
	      if (!usedLiteral) {
	        this.popStack();
	      }
	      if (createdStack) {
	        this.stackSlot--;
	      }
	      this.push('(' + prefix + item + ')');
	    } else {
	      // Prevent modification of the context depth variable. Through replaceStack
	      if (!/^stack/.test(stack)) {
	        stack = this.nextStack();
	      }
	
	      this.pushSource(stack + " = (" + prefix + item + ");");
	    }
	    return stack;
	  },
	
	  nextStack: function() {
	    return this.pushStack();
	  },
	
	  incrStack: function() {
	    this.stackSlot++;
	    if(this.stackSlot > this.stackVars.length) { this.stackVars.push("stack" + this.stackSlot); }
	    return this.topStackName();
	  },
	  topStackName: function() {
	    return "stack" + this.stackSlot;
	  },
	  flushInline: function() {
	    var inlineStack = this.inlineStack;
	    if (inlineStack.length) {
	      this.inlineStack = [];
	      for (var i = 0, len = inlineStack.length; i < len; i++) {
	        var entry = inlineStack[i];
	        if (entry instanceof Literal) {
	          this.compileStack.push(entry);
	        } else {
	          this.pushStack(entry);
	        }
	      }
	    }
	  },
	  isInline: function() {
	    return this.inlineStack.length;
	  },
	
	  popStack: function(wrapped) {
	    var inline = this.isInline(),
	        item = (inline ? this.inlineStack : this.compileStack).pop();
	
	    if (!wrapped && (item instanceof Literal)) {
	      return item.value;
	    } else {
	      if (!inline) {
	        if (!this.stackSlot) {
	          throw new Exception('Invalid stack pop');
	        }
	        this.stackSlot--;
	      }
	      return item;
	    }
	  },
	
	  topStack: function(wrapped) {
	    var stack = (this.isInline() ? this.inlineStack : this.compileStack),
	        item = stack[stack.length - 1];
	
	    if (!wrapped && (item instanceof Literal)) {
	      return item.value;
	    } else {
	      return item;
	    }
	  },
	
	  quotedString: function(str) {
	    return '"' + str
	      .replace(/\\/g, '\\\\')
	      .replace(/"/g, '\\"')
	      .replace(/\n/g, '\\n')
	      .replace(/\r/g, '\\r')
	      .replace(/\u2028/g, '\\u2028')   // Per Ecma-262 7.3 + 7.8.4
	      .replace(/\u2029/g, '\\u2029') + '"';
	  },
	
	  setupHelper: function(paramSize, name, missingParams) {
	    var params = [],
	        paramsInit = this.setupParams(paramSize, params, missingParams);
	    var foundHelper = this.nameLookup('helpers', name, 'helper');
	
	    return {
	      params: params,
	      paramsInit: paramsInit,
	      name: foundHelper,
	      callParams: ["depth0"].concat(params).join(", "),
	      helperMissingParams: missingParams && ["depth0", this.quotedString(name)].concat(params).join(", ")
	    };
	  },
	
	  setupOptions: function(paramSize, params) {
	    var options = [], contexts = [], types = [], param, inverse, program;
	
	    options.push("hash:" + this.popStack());
	
	    if (this.options.stringParams) {
	      options.push("hashTypes:" + this.popStack());
	      options.push("hashContexts:" + this.popStack());
	    }
	
	    inverse = this.popStack();
	    program = this.popStack();
	
	    // Avoid setting fn and inverse if neither are set. This allows
	    // helpers to do a check for `if (options.fn)`
	    if (program || inverse) {
	      if (!program) {
	        this.context.aliases.self = "this";
	        program = "self.noop";
	      }
	
	      if (!inverse) {
	        this.context.aliases.self = "this";
	        inverse = "self.noop";
	      }
	
	      options.push("inverse:" + inverse);
	      options.push("fn:" + program);
	    }
	
	    for(var i=0; i<paramSize; i++) {
	      param = this.popStack();
	      params.push(param);
	
	      if(this.options.stringParams) {
	        types.push(this.popStack());
	        contexts.push(this.popStack());
	      }
	    }
	
	    if (this.options.stringParams) {
	      options.push("contexts:[" + contexts.join(",") + "]");
	      options.push("types:[" + types.join(",") + "]");
	    }
	
	    if(this.options.data) {
	      options.push("data:data");
	    }
	
	    return options;
	  },
	
	  // the params and contexts arguments are passed in arrays
	  // to fill in
	  setupParams: function(paramSize, params, useRegister) {
	    var options = '{' + this.setupOptions(paramSize, params).join(',') + '}';
	
	    if (useRegister) {
	      this.useRegister('options');
	      params.push('options');
	      return 'options=' + options;
	    } else {
	      params.push(options);
	      return '';
	    }
	  }
	};
	
	var reservedWords = (
	  "break else new var" +
	  " case finally return void" +
	  " catch for switch while" +
	  " continue function this with" +
	  " default if throw" +
	  " delete in try" +
	  " do instanceof typeof" +
	  " abstract enum int short" +
	  " boolean export interface static" +
	  " byte extends long super" +
	  " char final native synchronized" +
	  " class float package throws" +
	  " const goto private transient" +
	  " debugger implements protected volatile" +
	  " double import public let yield"
	).split(" ");
	
	var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};
	
	for(var i=0, l=reservedWords.length; i<l; i++) {
	  compilerWords[reservedWords[i]] = true;
	}
	
	JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
	  if(!JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name)) {
	    return true;
	  }
	  return false;
	};
	
	exports["default"] = JavaScriptCompiler;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* jshint ignore:start */
	/* Jison generated parser */
	var handlebars = (function(){
	var parser = {trace: function trace() { },
	yy: {},
	symbols_: {"error":2,"root":3,"statements":4,"EOF":5,"program":6,"simpleInverse":7,"statement":8,"openInverse":9,"closeBlock":10,"openBlock":11,"mustache":12,"partial":13,"CONTENT":14,"COMMENT":15,"OPEN_BLOCK":16,"sexpr":17,"CLOSE":18,"OPEN_INVERSE":19,"OPEN_ENDBLOCK":20,"path":21,"OPEN":22,"OPEN_UNESCAPED":23,"CLOSE_UNESCAPED":24,"OPEN_PARTIAL":25,"partialName":26,"partial_option0":27,"sexpr_repetition0":28,"sexpr_option0":29,"dataName":30,"param":31,"STRING":32,"INTEGER":33,"BOOLEAN":34,"OPEN_SEXPR":35,"CLOSE_SEXPR":36,"hash":37,"hash_repetition_plus0":38,"hashSegment":39,"ID":40,"EQUALS":41,"DATA":42,"pathSegments":43,"SEP":44,"$accept":0,"$end":1},
	terminals_: {2:"error",5:"EOF",14:"CONTENT",15:"COMMENT",16:"OPEN_BLOCK",18:"CLOSE",19:"OPEN_INVERSE",20:"OPEN_ENDBLOCK",22:"OPEN",23:"OPEN_UNESCAPED",24:"CLOSE_UNESCAPED",25:"OPEN_PARTIAL",32:"STRING",33:"INTEGER",34:"BOOLEAN",35:"OPEN_SEXPR",36:"CLOSE_SEXPR",40:"ID",41:"EQUALS",42:"DATA",44:"SEP"},
	productions_: [0,[3,2],[3,1],[6,2],[6,3],[6,2],[6,1],[6,1],[6,0],[4,1],[4,2],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[11,3],[9,3],[10,3],[12,3],[12,3],[13,4],[7,2],[17,3],[17,1],[31,1],[31,1],[31,1],[31,1],[31,1],[31,3],[37,1],[39,3],[26,1],[26,1],[26,1],[30,2],[21,1],[43,3],[43,1],[27,0],[27,1],[28,0],[28,2],[29,0],[29,1],[38,1],[38,2]],
	performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {
	
	var $0 = $$.length - 1;
	switch (yystate) {
	case 1: return new yy.ProgramNode($$[$0-1], this._$); 
	break;
	case 2: return new yy.ProgramNode([], this._$); 
	break;
	case 3:this.$ = new yy.ProgramNode([], $$[$0-1], $$[$0], this._$);
	break;
	case 4:this.$ = new yy.ProgramNode($$[$0-2], $$[$0-1], $$[$0], this._$);
	break;
	case 5:this.$ = new yy.ProgramNode($$[$0-1], $$[$0], [], this._$);
	break;
	case 6:this.$ = new yy.ProgramNode($$[$0], this._$);
	break;
	case 7:this.$ = new yy.ProgramNode([], this._$);
	break;
	case 8:this.$ = new yy.ProgramNode([], this._$);
	break;
	case 9:this.$ = [$$[$0]];
	break;
	case 10: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
	break;
	case 11:this.$ = new yy.BlockNode($$[$0-2], $$[$0-1].inverse, $$[$0-1], $$[$0], this._$);
	break;
	case 12:this.$ = new yy.BlockNode($$[$0-2], $$[$0-1], $$[$0-1].inverse, $$[$0], this._$);
	break;
	case 13:this.$ = $$[$0];
	break;
	case 14:this.$ = $$[$0];
	break;
	case 15:this.$ = new yy.ContentNode($$[$0], this._$);
	break;
	case 16:this.$ = new yy.CommentNode($$[$0], this._$);
	break;
	case 17:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], stripFlags($$[$0-2], $$[$0]), this._$);
	break;
	case 18:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], stripFlags($$[$0-2], $$[$0]), this._$);
	break;
	case 19:this.$ = {path: $$[$0-1], strip: stripFlags($$[$0-2], $$[$0])};
	break;
	case 20:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], stripFlags($$[$0-2], $$[$0]), this._$);
	break;
	case 21:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], stripFlags($$[$0-2], $$[$0]), this._$);
	break;
	case 22:this.$ = new yy.PartialNode($$[$0-2], $$[$0-1], stripFlags($$[$0-3], $$[$0]), this._$);
	break;
	case 23:this.$ = stripFlags($$[$0-1], $$[$0]);
	break;
	case 24:this.$ = new yy.SexprNode([$$[$0-2]].concat($$[$0-1]), $$[$0], this._$);
	break;
	case 25:this.$ = new yy.SexprNode([$$[$0]], null, this._$);
	break;
	case 26:this.$ = $$[$0];
	break;
	case 27:this.$ = new yy.StringNode($$[$0], this._$);
	break;
	case 28:this.$ = new yy.IntegerNode($$[$0], this._$);
	break;
	case 29:this.$ = new yy.BooleanNode($$[$0], this._$);
	break;
	case 30:this.$ = $$[$0];
	break;
	case 31:$$[$0-1].isHelper = true; this.$ = $$[$0-1];
	break;
	case 32:this.$ = new yy.HashNode($$[$0], this._$);
	break;
	case 33:this.$ = [$$[$0-2], $$[$0]];
	break;
	case 34:this.$ = new yy.PartialNameNode($$[$0], this._$);
	break;
	case 35:this.$ = new yy.PartialNameNode(new yy.StringNode($$[$0], this._$), this._$);
	break;
	case 36:this.$ = new yy.PartialNameNode(new yy.IntegerNode($$[$0], this._$));
	break;
	case 37:this.$ = new yy.DataNode($$[$0], this._$);
	break;
	case 38:this.$ = new yy.IdNode($$[$0], this._$);
	break;
	case 39: $$[$0-2].push({part: $$[$0], separator: $$[$0-1]}); this.$ = $$[$0-2]; 
	break;
	case 40:this.$ = [{part: $$[$0]}];
	break;
	case 43:this.$ = [];
	break;
	case 44:$$[$0-1].push($$[$0]);
	break;
	case 47:this.$ = [$$[$0]];
	break;
	case 48:$$[$0-1].push($$[$0]);
	break;
	}
	},
	table: [{3:1,4:2,5:[1,3],8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],25:[1,15]},{1:[3]},{5:[1,16],8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],25:[1,15]},{1:[2,2]},{5:[2,9],14:[2,9],15:[2,9],16:[2,9],19:[2,9],20:[2,9],22:[2,9],23:[2,9],25:[2,9]},{4:20,6:18,7:19,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,8],22:[1,13],23:[1,14],25:[1,15]},{4:20,6:22,7:19,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,8],22:[1,13],23:[1,14],25:[1,15]},{5:[2,13],14:[2,13],15:[2,13],16:[2,13],19:[2,13],20:[2,13],22:[2,13],23:[2,13],25:[2,13]},{5:[2,14],14:[2,14],15:[2,14],16:[2,14],19:[2,14],20:[2,14],22:[2,14],23:[2,14],25:[2,14]},{5:[2,15],14:[2,15],15:[2,15],16:[2,15],19:[2,15],20:[2,15],22:[2,15],23:[2,15],25:[2,15]},{5:[2,16],14:[2,16],15:[2,16],16:[2,16],19:[2,16],20:[2,16],22:[2,16],23:[2,16],25:[2,16]},{17:23,21:24,30:25,40:[1,28],42:[1,27],43:26},{17:29,21:24,30:25,40:[1,28],42:[1,27],43:26},{17:30,21:24,30:25,40:[1,28],42:[1,27],43:26},{17:31,21:24,30:25,40:[1,28],42:[1,27],43:26},{21:33,26:32,32:[1,34],33:[1,35],40:[1,28],43:26},{1:[2,1]},{5:[2,10],14:[2,10],15:[2,10],16:[2,10],19:[2,10],20:[2,10],22:[2,10],23:[2,10],25:[2,10]},{10:36,20:[1,37]},{4:38,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,7],22:[1,13],23:[1,14],25:[1,15]},{7:39,8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,6],22:[1,13],23:[1,14],25:[1,15]},{17:23,18:[1,40],21:24,30:25,40:[1,28],42:[1,27],43:26},{10:41,20:[1,37]},{18:[1,42]},{18:[2,43],24:[2,43],28:43,32:[2,43],33:[2,43],34:[2,43],35:[2,43],36:[2,43],40:[2,43],42:[2,43]},{18:[2,25],24:[2,25],36:[2,25]},{18:[2,38],24:[2,38],32:[2,38],33:[2,38],34:[2,38],35:[2,38],36:[2,38],40:[2,38],42:[2,38],44:[1,44]},{21:45,40:[1,28],43:26},{18:[2,40],24:[2,40],32:[2,40],33:[2,40],34:[2,40],35:[2,40],36:[2,40],40:[2,40],42:[2,40],44:[2,40]},{18:[1,46]},{18:[1,47]},{24:[1,48]},{18:[2,41],21:50,27:49,40:[1,28],43:26},{18:[2,34],40:[2,34]},{18:[2,35],40:[2,35]},{18:[2,36],40:[2,36]},{5:[2,11],14:[2,11],15:[2,11],16:[2,11],19:[2,11],20:[2,11],22:[2,11],23:[2,11],25:[2,11]},{21:51,40:[1,28],43:26},{8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,3],22:[1,13],23:[1,14],25:[1,15]},{4:52,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,5],22:[1,13],23:[1,14],25:[1,15]},{14:[2,23],15:[2,23],16:[2,23],19:[2,23],20:[2,23],22:[2,23],23:[2,23],25:[2,23]},{5:[2,12],14:[2,12],15:[2,12],16:[2,12],19:[2,12],20:[2,12],22:[2,12],23:[2,12],25:[2,12]},{14:[2,18],15:[2,18],16:[2,18],19:[2,18],20:[2,18],22:[2,18],23:[2,18],25:[2,18]},{18:[2,45],21:56,24:[2,45],29:53,30:60,31:54,32:[1,57],33:[1,58],34:[1,59],35:[1,61],36:[2,45],37:55,38:62,39:63,40:[1,64],42:[1,27],43:26},{40:[1,65]},{18:[2,37],24:[2,37],32:[2,37],33:[2,37],34:[2,37],35:[2,37],36:[2,37],40:[2,37],42:[2,37]},{14:[2,17],15:[2,17],16:[2,17],19:[2,17],20:[2,17],22:[2,17],23:[2,17],25:[2,17]},{5:[2,20],14:[2,20],15:[2,20],16:[2,20],19:[2,20],20:[2,20],22:[2,20],23:[2,20],25:[2,20]},{5:[2,21],14:[2,21],15:[2,21],16:[2,21],19:[2,21],20:[2,21],22:[2,21],23:[2,21],25:[2,21]},{18:[1,66]},{18:[2,42]},{18:[1,67]},{8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,4],22:[1,13],23:[1,14],25:[1,15]},{18:[2,24],24:[2,24],36:[2,24]},{18:[2,44],24:[2,44],32:[2,44],33:[2,44],34:[2,44],35:[2,44],36:[2,44],40:[2,44],42:[2,44]},{18:[2,46],24:[2,46],36:[2,46]},{18:[2,26],24:[2,26],32:[2,26],33:[2,26],34:[2,26],35:[2,26],36:[2,26],40:[2,26],42:[2,26]},{18:[2,27],24:[2,27],32:[2,27],33:[2,27],34:[2,27],35:[2,27],36:[2,27],40:[2,27],42:[2,27]},{18:[2,28],24:[2,28],32:[2,28],33:[2,28],34:[2,28],35:[2,28],36:[2,28],40:[2,28],42:[2,28]},{18:[2,29],24:[2,29],32:[2,29],33:[2,29],34:[2,29],35:[2,29],36:[2,29],40:[2,29],42:[2,29]},{18:[2,30],24:[2,30],32:[2,30],33:[2,30],34:[2,30],35:[2,30],36:[2,30],40:[2,30],42:[2,30]},{17:68,21:24,30:25,40:[1,28],42:[1,27],43:26},{18:[2,32],24:[2,32],36:[2,32],39:69,40:[1,70]},{18:[2,47],24:[2,47],36:[2,47],40:[2,47]},{18:[2,40],24:[2,40],32:[2,40],33:[2,40],34:[2,40],35:[2,40],36:[2,40],40:[2,40],41:[1,71],42:[2,40],44:[2,40]},{18:[2,39],24:[2,39],32:[2,39],33:[2,39],34:[2,39],35:[2,39],36:[2,39],40:[2,39],42:[2,39],44:[2,39]},{5:[2,22],14:[2,22],15:[2,22],16:[2,22],19:[2,22],20:[2,22],22:[2,22],23:[2,22],25:[2,22]},{5:[2,19],14:[2,19],15:[2,19],16:[2,19],19:[2,19],20:[2,19],22:[2,19],23:[2,19],25:[2,19]},{36:[1,72]},{18:[2,48],24:[2,48],36:[2,48],40:[2,48]},{41:[1,71]},{21:56,30:60,31:73,32:[1,57],33:[1,58],34:[1,59],35:[1,61],40:[1,28],42:[1,27],43:26},{18:[2,31],24:[2,31],32:[2,31],33:[2,31],34:[2,31],35:[2,31],36:[2,31],40:[2,31],42:[2,31]},{18:[2,33],24:[2,33],36:[2,33],40:[2,33]}],
	defaultActions: {3:[2,2],16:[2,1],50:[2,42]},
	parseError: function parseError(str, hash) {
	    throw new Error(str);
	},
	parse: function parse(input) {
	    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
	    this.lexer.setInput(input);
	    this.lexer.yy = this.yy;
	    this.yy.lexer = this.lexer;
	    this.yy.parser = this;
	    if (typeof this.lexer.yylloc == "undefined")
	        this.lexer.yylloc = {};
	    var yyloc = this.lexer.yylloc;
	    lstack.push(yyloc);
	    var ranges = this.lexer.options && this.lexer.options.ranges;
	    if (typeof this.yy.parseError === "function")
	        this.parseError = this.yy.parseError;
	    function popStack(n) {
	        stack.length = stack.length - 2 * n;
	        vstack.length = vstack.length - n;
	        lstack.length = lstack.length - n;
	    }
	    function lex() {
	        var token;
	        token = self.lexer.lex() || 1;
	        if (typeof token !== "number") {
	            token = self.symbols_[token] || token;
	        }
	        return token;
	    }
	    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
	    while (true) {
	        state = stack[stack.length - 1];
	        if (this.defaultActions[state]) {
	            action = this.defaultActions[state];
	        } else {
	            if (symbol === null || typeof symbol == "undefined") {
	                symbol = lex();
	            }
	            action = table[state] && table[state][symbol];
	        }
	        if (typeof action === "undefined" || !action.length || !action[0]) {
	            var errStr = "";
	            if (!recovering) {
	                expected = [];
	                for (p in table[state])
	                    if (this.terminals_[p] && p > 2) {
	                        expected.push("'" + this.terminals_[p] + "'");
	                    }
	                if (this.lexer.showPosition) {
	                    errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
	                } else {
	                    errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
	                }
	                this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
	            }
	        }
	        if (action[0] instanceof Array && action.length > 1) {
	            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
	        }
	        switch (action[0]) {
	        case 1:
	            stack.push(symbol);
	            vstack.push(this.lexer.yytext);
	            lstack.push(this.lexer.yylloc);
	            stack.push(action[1]);
	            symbol = null;
	            if (!preErrorSymbol) {
	                yyleng = this.lexer.yyleng;
	                yytext = this.lexer.yytext;
	                yylineno = this.lexer.yylineno;
	                yyloc = this.lexer.yylloc;
	                if (recovering > 0)
	                    recovering--;
	            } else {
	                symbol = preErrorSymbol;
	                preErrorSymbol = null;
	            }
	            break;
	        case 2:
	            len = this.productions_[action[1]][1];
	            yyval.$ = vstack[vstack.length - len];
	            yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
	            if (ranges) {
	                yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
	            }
	            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
	            if (typeof r !== "undefined") {
	                return r;
	            }
	            if (len) {
	                stack = stack.slice(0, -1 * len * 2);
	                vstack = vstack.slice(0, -1 * len);
	                lstack = lstack.slice(0, -1 * len);
	            }
	            stack.push(this.productions_[action[1]][0]);
	            vstack.push(yyval.$);
	            lstack.push(yyval._$);
	            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
	            stack.push(newState);
	            break;
	        case 3:
	            return true;
	        }
	    }
	    return true;
	}
	};
	
	
	function stripFlags(open, close) {
	  return {
	    left: open.charAt(2) === '~',
	    right: close.charAt(0) === '~' || close.charAt(1) === '~'
	  };
	}
	
	/* Jison generated lexer */
	var lexer = (function(){
	var lexer = ({EOF:1,
	parseError:function parseError(str, hash) {
	        if (this.yy.parser) {
	            this.yy.parser.parseError(str, hash);
	        } else {
	            throw new Error(str);
	        }
	    },
	setInput:function (input) {
	        this._input = input;
	        this._more = this._less = this.done = false;
	        this.yylineno = this.yyleng = 0;
	        this.yytext = this.matched = this.match = '';
	        this.conditionStack = ['INITIAL'];
	        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
	        if (this.options.ranges) this.yylloc.range = [0,0];
	        this.offset = 0;
	        return this;
	    },
	input:function () {
	        var ch = this._input[0];
	        this.yytext += ch;
	        this.yyleng++;
	        this.offset++;
	        this.match += ch;
	        this.matched += ch;
	        var lines = ch.match(/(?:\r\n?|\n).*/g);
	        if (lines) {
	            this.yylineno++;
	            this.yylloc.last_line++;
	        } else {
	            this.yylloc.last_column++;
	        }
	        if (this.options.ranges) this.yylloc.range[1]++;
	
	        this._input = this._input.slice(1);
	        return ch;
	    },
	unput:function (ch) {
	        var len = ch.length;
	        var lines = ch.split(/(?:\r\n?|\n)/g);
	
	        this._input = ch + this._input;
	        this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
	        //this.yyleng -= len;
	        this.offset -= len;
	        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
	        this.match = this.match.substr(0, this.match.length-1);
	        this.matched = this.matched.substr(0, this.matched.length-1);
	
	        if (lines.length-1) this.yylineno -= lines.length-1;
	        var r = this.yylloc.range;
	
	        this.yylloc = {first_line: this.yylloc.first_line,
	          last_line: this.yylineno+1,
	          first_column: this.yylloc.first_column,
	          last_column: lines ?
	              (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
	              this.yylloc.first_column - len
	          };
	
	        if (this.options.ranges) {
	            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
	        }
	        return this;
	    },
	more:function () {
	        this._more = true;
	        return this;
	    },
	less:function (n) {
	        this.unput(this.match.slice(n));
	    },
	pastInput:function () {
	        var past = this.matched.substr(0, this.matched.length - this.match.length);
	        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
	    },
	upcomingInput:function () {
	        var next = this.match;
	        if (next.length < 20) {
	            next += this._input.substr(0, 20-next.length);
	        }
	        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
	    },
	showPosition:function () {
	        var pre = this.pastInput();
	        var c = new Array(pre.length + 1).join("-");
	        return pre + this.upcomingInput() + "\n" + c+"^";
	    },
	next:function () {
	        if (this.done) {
	            return this.EOF;
	        }
	        if (!this._input) this.done = true;
	
	        var token,
	            match,
	            tempMatch,
	            index,
	            col,
	            lines;
	        if (!this._more) {
	            this.yytext = '';
	            this.match = '';
	        }
	        var rules = this._currentRules();
	        for (var i=0;i < rules.length; i++) {
	            tempMatch = this._input.match(this.rules[rules[i]]);
	            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
	                match = tempMatch;
	                index = i;
	                if (!this.options.flex) break;
	            }
	        }
	        if (match) {
	            lines = match[0].match(/(?:\r\n?|\n).*/g);
	            if (lines) this.yylineno += lines.length;
	            this.yylloc = {first_line: this.yylloc.last_line,
	                           last_line: this.yylineno+1,
	                           first_column: this.yylloc.last_column,
	                           last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
	            this.yytext += match[0];
	            this.match += match[0];
	            this.matches = match;
	            this.yyleng = this.yytext.length;
	            if (this.options.ranges) {
	                this.yylloc.range = [this.offset, this.offset += this.yyleng];
	            }
	            this._more = false;
	            this._input = this._input.slice(match[0].length);
	            this.matched += match[0];
	            token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
	            if (this.done && this._input) this.done = false;
	            if (token) return token;
	            else return;
	        }
	        if (this._input === "") {
	            return this.EOF;
	        } else {
	            return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
	                    {text: "", token: null, line: this.yylineno});
	        }
	    },
	lex:function lex() {
	        var r = this.next();
	        if (typeof r !== 'undefined') {
	            return r;
	        } else {
	            return this.lex();
	        }
	    },
	begin:function begin(condition) {
	        this.conditionStack.push(condition);
	    },
	popState:function popState() {
	        return this.conditionStack.pop();
	    },
	_currentRules:function _currentRules() {
	        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
	    },
	topState:function () {
	        return this.conditionStack[this.conditionStack.length-2];
	    },
	pushState:function begin(condition) {
	        this.begin(condition);
	    }});
	lexer.options = {};
	lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
	
	
	function strip(start, end) {
	  return yy_.yytext = yy_.yytext.substr(start, yy_.yyleng-end);
	}
	
	
	var YYSTATE=YY_START
	switch($avoiding_name_collisions) {
	case 0:
	                                   if(yy_.yytext.slice(-2) === "\\\\") {
	                                     strip(0,1);
	                                     this.begin("mu");
	                                   } else if(yy_.yytext.slice(-1) === "\\") {
	                                     strip(0,1);
	                                     this.begin("emu");
	                                   } else {
	                                     this.begin("mu");
	                                   }
	                                   if(yy_.yytext) return 14;
	                                 
	break;
	case 1:return 14;
	break;
	case 2:
	                                   this.popState();
	                                   return 14;
	                                 
	break;
	case 3:strip(0,4); this.popState(); return 15;
	break;
	case 4:return 35;
	break;
	case 5:return 36;
	break;
	case 6:return 25;
	break;
	case 7:return 16;
	break;
	case 8:return 20;
	break;
	case 9:return 19;
	break;
	case 10:return 19;
	break;
	case 11:return 23;
	break;
	case 12:return 22;
	break;
	case 13:this.popState(); this.begin('com');
	break;
	case 14:strip(3,5); this.popState(); return 15;
	break;
	case 15:return 22;
	break;
	case 16:return 41;
	break;
	case 17:return 40;
	break;
	case 18:return 40;
	break;
	case 19:return 44;
	break;
	case 20:// ignore whitespace
	break;
	case 21:this.popState(); return 24;
	break;
	case 22:this.popState(); return 18;
	break;
	case 23:yy_.yytext = strip(1,2).replace(/\\"/g,'"'); return 32;
	break;
	case 24:yy_.yytext = strip(1,2).replace(/\\'/g,"'"); return 32;
	break;
	case 25:return 42;
	break;
	case 26:return 34;
	break;
	case 27:return 34;
	break;
	case 28:return 33;
	break;
	case 29:return 40;
	break;
	case 30:yy_.yytext = strip(1,2); return 40;
	break;
	case 31:return 'INVALID';
	break;
	case 32:return 5;
	break;
	}
	};
	lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:[\s\S]*?--\}\})/,/^(?:\()/,/^(?:\))/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{!--)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{(~)?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.)])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s)])))/,/^(?:false(?=([~}\s)])))/,/^(?:-?[0-9]+(?=([~}\s)])))/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)]))))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/];
	lexer.conditions = {"mu":{"rules":[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],"inclusive":false},"emu":{"rules":[2],"inclusive":false},"com":{"rules":[3],"inclusive":false},"INITIAL":{"rules":[0,1,32],"inclusive":true}};
	return lexer;})()
	parser.lexer = lexer;
	function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
	return new Parser;
	})();exports["default"] = handlebars;
	/* jshint ignore:end */

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Utils = __webpack_require__(5);
	var Exception = __webpack_require__(3)["default"];
	var COMPILER_REVISION = __webpack_require__(2).COMPILER_REVISION;
	var REVISION_CHANGES = __webpack_require__(2).REVISION_CHANGES;
	
	function checkRevision(compilerInfo) {
	  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
	      currentRevision = COMPILER_REVISION;
	
	  if (compilerRevision !== currentRevision) {
	    if (compilerRevision < currentRevision) {
	      var runtimeVersions = REVISION_CHANGES[currentRevision],
	          compilerVersions = REVISION_CHANGES[compilerRevision];
	      throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
	            "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
	    } else {
	      // Use the embedded version info since the runtime doesn't know about this revision yet
	      throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
	            "Please update your runtime to a newer version ("+compilerInfo[1]+").");
	    }
	  }
	}
	
	exports.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial
	
	function template(templateSpec, env) {
	  if (!env) {
	    throw new Exception("No environment passed to template");
	  }
	
	  // Note: Using env.VM references rather than local var references throughout this section to allow
	  // for external users to override these as psuedo-supported APIs.
	  var invokePartialWrapper = function(partial, name, context, helpers, partials, data) {
	    var result = env.VM.invokePartial.apply(this, arguments);
	    if (result != null) { return result; }
	
	    if (env.compile) {
	      var options = { helpers: helpers, partials: partials, data: data };
	      partials[name] = env.compile(partial, { data: data !== undefined }, env);
	      return partials[name](context, options);
	    } else {
	      throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
	    }
	  };
	
	  // Just add water
	  var container = {
	    escapeExpression: Utils.escapeExpression,
	    invokePartial: invokePartialWrapper,
	    programs: [],
	    program: function(i, fn, data) {
	      var programWrapper = this.programs[i];
	      if(data) {
	        programWrapper = program(i, fn, data);
	      } else if (!programWrapper) {
	        programWrapper = this.programs[i] = program(i, fn);
	      }
	      return programWrapper;
	    },
	    merge: function(param, common) {
	      var ret = param || common;
	
	      if (param && common && (param !== common)) {
	        ret = {};
	        Utils.extend(ret, common);
	        Utils.extend(ret, param);
	      }
	      return ret;
	    },
	    programWithDepth: env.VM.programWithDepth,
	    noop: env.VM.noop,
	    compilerInfo: null
	  };
	
	  return function(context, options) {
	    options = options || {};
	    var namespace = options.partial ? options : env,
	        helpers,
	        partials;
	
	    if (!options.partial) {
	      helpers = options.helpers;
	      partials = options.partials;
	    }
	    var result = templateSpec.call(
	          container,
	          namespace, context,
	          helpers,
	          partials,
	          options.data);
	
	    if (!options.partial) {
	      env.VM.checkRevision(container.compilerInfo);
	    }
	
	    return result;
	  };
	}
	
	exports.template = template;function programWithDepth(i, fn, data /*, $depth */) {
	  var args = Array.prototype.slice.call(arguments, 3);
	
	  var prog = function(context, options) {
	    options = options || {};
	
	    return fn.apply(this, [context, options.data || data].concat(args));
	  };
	  prog.program = i;
	  prog.depth = args.length;
	  return prog;
	}
	
	exports.programWithDepth = programWithDepth;function program(i, fn, data) {
	  var prog = function(context, options) {
	    options = options || {};
	
	    return fn(context, options.data || data);
	  };
	  prog.program = i;
	  prog.depth = 0;
	  return prog;
	}
	
	exports.program = program;function invokePartial(partial, name, context, helpers, partials, data) {
	  var options = { partial: true, helpers: helpers, partials: partials, data: data };
	
	  if(partial === undefined) {
	    throw new Exception("The partial " + name + " could not be found");
	  } else if(partial instanceof Function) {
	    return partial(context, options);
	  }
	}
	
	exports.invokePartial = invokePartial;function noop() { return ""; }
	
	exports.noop = noop;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(1),
	    Dialog = __webpack_require__(15);
	
	var template = __webpack_require__(18);
	
	// ConfirmBox
	// -------
	// ConfirmBox 是一个有基础模板和样式的对话框组件。
	var ConfirmBox = Dialog.extend({
	
	  attrs: {
	    title: '默认标题',
	
	    confirmTpl: '<a class="ui-dialog-button-orange" href="javascript:;">确定</a>',
	
	    cancelTpl: '<a class="ui-dialog-button-white" href="javascript:;">取消</a>',
	
	    message: '默认内容'
	  },
	
	  setup: function () {
	    ConfirmBox.superclass.setup.call(this);
	
	    var model = {
	      classPrefix: this.get('classPrefix'),
	      message: this.get('message'),
	      title: this.get('title'),
	      confirmTpl: this.get('confirmTpl'),
	      cancelTpl: this.get('cancelTpl'),
	      hasFoot: this.get('confirmTpl') || this.get('cancelTpl')
	    };
	    this.set('content', template(model));
	  },
	
	  events: {
	    'click [data-role=confirm]': function (e) {
	      e.preventDefault();
	      this.trigger('confirm');
	    },
	    'click [data-role=cancel]': function (e) {
	      e.preventDefault();
	      this.trigger('cancel');
	      this.hide();
	    }
	  },
	
	  _onChangeMessage: function (val) {
	    this.$('[data-role=message]').html(val);
	  },
	
	  _onChangeTitle: function (val) {
	    this.$('[data-role=title]').html(val);
	  },
	
	  _onChangeConfirmTpl: function (val) {
	    this.$('[data-role=confirm]').html(val);
	  },
	
	  _onChangeCancelTpl: function (val) {
	    this.$('[data-role=cancel]').html(val);
	  }
	
	});
	
	ConfirmBox.alert = function (message, callback, options) {
	  var defaults = {
	    message: message,
	    title: '',
	    cancelTpl: '',
	    closeTpl: '',
	    onConfirm: function () {
	      callback && callback();
	      this.hide();
	    }
	  };
	  new ConfirmBox($.extend(null, defaults, options)).show().after('hide', function () {
	    this.destroy();
	  });
	};
	
	ConfirmBox.confirm = function (message, title, onConfirm, onCancel, options) {
	  // support confirm(message, title, onConfirm, options)
	  if (typeof onCancel === 'object' && !options) {
	    options = onCancel;
	  }
	
	  var defaults = {
	    message: message,
	    title: title || '确认框',
	    closeTpl: '',
	    onConfirm: function () {
	      onConfirm && onConfirm();
	      this.hide();
	    },
	    onCancel: function () {
	      onCancel && onCancel();
	      this.hide();
	    }
	  };
	  new ConfirmBox($.extend(null, defaults, options)).show().after('hide', function () {
	    this.destroy();
	  });
	};
	
	ConfirmBox.show = function (message, callback, options) {
	  var defaults = {
	    message: message,
	    title: '',
	    confirmTpl: false,
	    cancelTpl: false
	  };
	  new ConfirmBox($.extend(null, defaults, options)).show().before('hide', function () {
	    callback && callback();
	  }).after('hide', function () {
	    this.destroy();
	  });
	};
	
	module.exports = ConfirmBox;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/*globals Handlebars: true */
	var base = __webpack_require__(6);
	
	// Each of these augment the Handlebars object. No need to setup here.
	// (This is done to easily share code between commonjs and browse envs)
	var SafeString = __webpack_require__(16)["default"];
	var Exception = __webpack_require__(7)["default"];
	var Utils = __webpack_require__(8);
	var runtime = __webpack_require__(42);
	
	// For compatibility and usage outside of module systems, make the Handlebars object a namespace
	var create = function() {
	  var hb = new base.HandlebarsEnvironment();
	
	  Utils.extend(hb, base);
	  hb.SafeString = SafeString;
	  hb.Exception = Exception;
	  hb.Utils = Utils;
	
	  hb.VM = runtime;
	  hb.template = function(spec) {
	    return runtime.template(spec, hb);
	  };
	
	  return hb;
	};
	
	var Handlebars = create();
	Handlebars.create = create;
	
	exports["default"] = Handlebars;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Utils = __webpack_require__(8);
	var Exception = __webpack_require__(7)["default"];
	var COMPILER_REVISION = __webpack_require__(6).COMPILER_REVISION;
	var REVISION_CHANGES = __webpack_require__(6).REVISION_CHANGES;
	
	function checkRevision(compilerInfo) {
	  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
	      currentRevision = COMPILER_REVISION;
	
	  if (compilerRevision !== currentRevision) {
	    if (compilerRevision < currentRevision) {
	      var runtimeVersions = REVISION_CHANGES[currentRevision],
	          compilerVersions = REVISION_CHANGES[compilerRevision];
	      throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
	            "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
	    } else {
	      // Use the embedded version info since the runtime doesn't know about this revision yet
	      throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
	            "Please update your runtime to a newer version ("+compilerInfo[1]+").");
	    }
	  }
	}
	
	exports.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial
	
	function template(templateSpec, env) {
	  if (!env) {
	    throw new Exception("No environment passed to template");
	  }
	
	  // Note: Using env.VM references rather than local var references throughout this section to allow
	  // for external users to override these as psuedo-supported APIs.
	  var invokePartialWrapper = function(partial, name, context, helpers, partials, data) {
	    var result = env.VM.invokePartial.apply(this, arguments);
	    if (result != null) { return result; }
	
	    if (env.compile) {
	      var options = { helpers: helpers, partials: partials, data: data };
	      partials[name] = env.compile(partial, { data: data !== undefined }, env);
	      return partials[name](context, options);
	    } else {
	      throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
	    }
	  };
	
	  // Just add water
	  var container = {
	    escapeExpression: Utils.escapeExpression,
	    invokePartial: invokePartialWrapper,
	    programs: [],
	    program: function(i, fn, data) {
	      var programWrapper = this.programs[i];
	      if(data) {
	        programWrapper = program(i, fn, data);
	      } else if (!programWrapper) {
	        programWrapper = this.programs[i] = program(i, fn);
	      }
	      return programWrapper;
	    },
	    merge: function(param, common) {
	      var ret = param || common;
	
	      if (param && common && (param !== common)) {
	        ret = {};
	        Utils.extend(ret, common);
	        Utils.extend(ret, param);
	      }
	      return ret;
	    },
	    programWithDepth: env.VM.programWithDepth,
	    noop: env.VM.noop,
	    compilerInfo: null
	  };
	
	  return function(context, options) {
	    options = options || {};
	    var namespace = options.partial ? options : env,
	        helpers,
	        partials;
	
	    if (!options.partial) {
	      helpers = options.helpers;
	      partials = options.partials;
	    }
	    var result = templateSpec.call(
	          container,
	          namespace, context,
	          helpers,
	          partials,
	          options.data);
	
	    if (!options.partial) {
	      env.VM.checkRevision(container.compilerInfo);
	    }
	
	    return result;
	  };
	}
	
	exports.template = template;function programWithDepth(i, fn, data /*, $depth */) {
	  var args = Array.prototype.slice.call(arguments, 3);
	
	  var prog = function(context, options) {
	    options = options || {};
	
	    return fn.apply(this, [context, options.data || data].concat(args));
	  };
	  prog.program = i;
	  prog.depth = args.length;
	  return prog;
	}
	
	exports.programWithDepth = programWithDepth;function program(i, fn, data) {
	  var prog = function(context, options) {
	    options = options || {};
	
	    return fn(context, options.data || data);
	  };
	  prog.program = i;
	  prog.depth = 0;
	  return prog;
	}
	
	exports.program = program;function invokePartial(partial, name, context, helpers, partials, data) {
	  var options = { partial: true, helpers: helpers, partials: partials, data: data };
	
	  if(partial === undefined) {
	    throw new Exception("The partial " + name + " could not be found");
	  } else if(partial instanceof Function) {
	    return partial(context, options);
	  }
	}
	
	exports.invokePartial = invokePartial;function noop() { return ""; }
	
	exports.noop = noop;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map