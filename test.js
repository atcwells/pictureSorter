import shell from "shelljs";

const {ls} = shell;

const x = ls(`./pictures/moved_files/IMG_20200519_154141287.jpg`);
console.log(x.length)