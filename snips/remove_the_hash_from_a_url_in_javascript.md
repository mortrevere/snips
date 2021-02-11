# Remove the hash from a URL in Javascript

When working with `window.location.hash`, you can read and set its value, but `window.location.hash = ''` leaves you with a `#` at the end of your URL.

Using the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API), we can now : 

```
history.replaceState(null, null, ' ');
```

and that trailing `#` is now gone.



TAGS : js web hash url history remove
DATE : 26 06 2019