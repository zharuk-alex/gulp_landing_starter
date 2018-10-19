var libs = {
  jquery: {
    js: 'node_modules/jquery/dist/jquery.js'
  },
  popper: {
    js: 'node_modules/popper.js/dist/umd/popper.js'
  },
  bootstrap: {
    js: 'node_modules/bootstrap/dist/js/bootstrap.bundle.js'
  },
};

var js_libs = Object.keys(libs).map(function(key, index) {
  return (libs[key].hasOwnProperty('js'))?libs[key].js:'';
},[]).concat(['src/libs/js/**/*.js']);

module.exports = function(gulp, plugins, dir) {
  var isDist = (dir == 'dist');
  var isBuild = (dir == 'build');
  return function() {
    return gulp.src(js_libs)
      .pipe(plugins.if(isDist, plugins.sourcemaps.init()))

      .pipe(plugins.if(isBuild, plugins.uglify()))
      .pipe(plugins.concat('libs.min.js'))
      .pipe(plugins.if(isDist, plugins.sourcemaps.write('.')))
      .pipe(gulp.dest(dir+'/assets/js/'));
  }
}
