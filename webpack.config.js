var config = {
   entry: './public/main.js',
	
   output: {
      path:'./',
      filename: 'index.js',
   },
	
   devServer: {
      inline: true,
      /*host: "192.168.1.2",*/
      port: 8081
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
				
            query: {
               presets: ['es2015', 'react']
            }
         },
	{ test: /\.css$/, loader: "style-loader!css-loader" }
      ]
   }
}

module.exports = config;
