const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const concat = require("gulp-concat");

/*
  --GULP's TOP-LEVEL FUNCTIONS
  gulp.task - Used to define tasks
  gulp.src - Used to define the location of source-files
  gulp.dest - Used to define the location for output files
  gulp.watch - Used to watch files/folders for changes
*/

// Defines a task to simply log a message
gulp.task("message", function() {
  return console.log("Gulp is running ...");
});

// Copies all HTML files from src to dest
gulp.task("copyHtmlFiles", function() {
  gulp.src("src/*.html")
  .pipe(gulp.dest("dist"));
});

// Optimize images
gulp.task("optimizeImages", () => 
  gulp.src("src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"))
  );

// Concatenate/Merge and minify all Js Files
gulp.task("concatAndMinifyJSFiles", () => 
  gulp.src("src/js/*.js")
  .pipe(concat("main.js"))
  .pipe(uglify())
  .pipe(gulp.dest("dist/js"))  
  );  

// Minify javascript files into one shrunken piece
gulp.task("minifyJSFiles", function() { 
  gulp.src("src/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
  });

// Compile sass files to css
gulp.task("compileSassFiles", () => 
    gulp.src("src/sass/*.scss")
      .pipe(sass().on("error", sass.logError))
      .pipe(gulp.dest("dist/css"))
  );  

// Defines the default task
gulp.task("default", ["message", "copyHtmlFiles", "optimizeImages", "concatAndMinifyJSFiles", "compileSassFiles"]);

gulp.task("watch", function() { 
    gulp.watch("src/js/*.js", ["concatAndMinifyJSFiles"]);
    gulp.watch("src/images/*", ["optimizeImages"]);
    gulp.watch("src/sass/*.scss", ["compileSassFiles"]);
    gulp.watch("src/*.html", ["copyHtmlFiles"]);
});
