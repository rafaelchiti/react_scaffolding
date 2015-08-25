# Webpack

We use [webpack](http://webpack.github.io/) as our main building tool.

The following techinques are being used from webpack for enabling a better Development Experience (DX).

### Loaders for all dependencies in our project.

Everything in the project gets required through webpack. This means
that we use the 'require' (or ES6 import) statement for requiring ALL the dependencies we might have in the project (including fonts, images, css, etc).
To be able to do this we configure webpack with different loaders that know how to handle the different file types.

Refer to webpack config for more details and explanation.

We have different webpack configurations to enable different builds (development, production, test).
