RelativePath.js
---------------------------------
This is a simple script that enables the use of relative values (in %) for defining SVG paths. This helps auto-scale SVG paths for different screen sizes.

----------
Basic Usage
-------------

#### Include the JS File
First, Include `relative-path-min.js` after the body tag. 
```
<body>
	<script src="relative-path-min.js" type="text/javascript" > </script>
.
.
</body>
```
####Creath SVG < path > using the `data-rel-d` attribute. 
It's simple! just use percentage values instead of absolute values.
```          
<svg width="100%" height="200" xmlns="http://www.w3.org/2000/svg">
	<path data-rel-d="M0,100% C30%,0 50%,100% 100%,20% L 100%,100%" stroke="transparent" fill="#313131"/>
</svg>
```
Here, the path will automatically scale with the size of it's parent, the < svg > element.

####Call RelativePath.auto()
Before closing your body tag, call this function so that RelativePath can automatically handle the paths which have the `rel-data-d` attribute.
```
<body>
	<script src="relative-path-min.js" type="text/javascript" > </script>
.
.

.
.
<script>
	RelativePath.auto();
</script>
</body>
```
Screen Breakpoints
-------------
|Attribute  |Screen Breakpoint|
|----------|:------------:|
| data-rel-d-xl | \>= 1280px   |
| data-rel-d-lg | \> = 1024px  |
| data-rel-d-md | \> = 768px   |
| data-rel-d-sm | \> = 568px   |
| data-rel-d    | < 568px     |

It will work for all screen sizes if you use only `data-rel-d`. Also, `data-rel-d` must always be an attribute of the path that you wish to scale.

You can change these thresholds by modifying `RelativePath.THRESHOLD.XL`, `RelativePath.THRESHOLD.LG`, `RelativePath.THRESHOLD.MD` and `RelativePath.THRESHOLD.SM` respectively before calling `RelativePath.auto()`

Scaling with window size or evaluated value
-------------
Instead of making the path scale with the size of it's parent, you can also scale with respect to the window size or an evaluated piece of code. Just use the `data-rel-width` and `data-rel-height` attribute

|Value|Description|
|------:|------:|
|parent| Scale with the size of the parent element |
|100%| Scale with the size of the parent element |
|window| Scale with the size of the window |
|JS Code| Scale with evaluated javascript code |

#####Example:
To scale width according to the value of a variable and height according to the window:
```
<script> 
	var widthVal = 1000;
</script>
<svg width="100%" height="200" xmlns="http://www.w3.org/2000/svg">
	<path data-rel-d="M0,100% C30%,0 50%,100% 100%,20% L 100%,100%" relWidth="widthVal * 2" relHeight="window" stroke="transparent" fill="#313131"/>
</svg>
<script>
	RelativePath.auto();
</script>
```

That is all!! Happy SVGing!