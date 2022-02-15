[html-chunk-loader](../README.md) / [Modules](../modules.md) / loader

# Module: loader

**`example`** Initialization
```javascript
const myLoader = loader( { pathRoot: 'views', templates: 'pages', partials: 'partials' } );
```

**`example`** Render
```javascript
myLoader.template( 'home', {...homeData} );
```

## Table of contents

### Functions

- [loader](loader.md#loader)

## Functions

### loader

▸ `Const` **loader**(`config`): [`Runtime`](types.Loader.md#runtime)

**`function`** loader

**`description`** Rendering Context

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`Options`](types.Loader.md#options) | config object for loader |

#### Returns

[`Runtime`](types.Loader.md#runtime)

Loader for application

#### Defined in

[loader.ts:23](https://github.com/abschill/html-chunk-loader/blob/3e38031/lib/loader.ts#L23)
