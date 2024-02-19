import { validate } from "./index.js";

function assert(actual, expected) {
    if (actual.fileCount !== expected.fileCount
        || actual.outErrorStr !== expected.outErrorStr) {

        throw new Error("Assertion failed."
            + "\nActual:"
            + "\n   fileCount:   " + actual.fileCount
            + "\n   outErrorStr: " + actual.outErrorStr
            + "\nExpected:"
            + "\n   fileCount:   " + expected.fileCount
            + "\n   outErrorStr: " + expected.outErrorStr);
    }
}

console.log("----- test set default");
assert(await validate("/", undefined), {
    fileCount: 5,
    outErrorStr: "file 'zzzinvalid.xml', colum 3, line 45: InvalidTag - Expected closing tag 'Height' (opened in line 13, col 4) instead of closing tag 'Frame'."
});

console.log("----- test directory name without slashes");
assert(await validate("test", undefined), {
        fileCount: 1,
        outErrorStr: ""
    });

console.log("----- test directory name with leading slash");
assert(await validate("/test", undefined), {
        fileCount: 1,
        outErrorStr: ""
    });

console.log("----- test directory name surrounded by slash");
assert(await validate("/test/", undefined), {
    fileCount: 1,
    outErrorStr: ""
});

console.log("----- test path with slash");
assert(await validate("test/", undefined), {
    fileCount: 1,
    outErrorStr: ""
});

console.log("----- test undefined path");
assert(await validate(undefined, undefined), {
    fileCount: 5,
    outErrorStr: "file 'zzzinvalid.xml', colum 3, line 45: InvalidTag - Expected closing tag 'Height' (opened in line 13, col 4) instead of closing tag 'Frame'."
});

console.log("----- test empty path");
assert(await validate("", undefined), {
    fileCount: 5,
    outErrorStr: "file 'zzzinvalid.xml', colum 3, line 45: InvalidTag - Expected closing tag 'Height' (opened in line 13, col 4) instead of closing tag 'Frame'."
});

console.log("----- test default file endings");
assert(await validate(undefined, ".xml"), {
    fileCount: 5,
    outErrorStr: "file 'zzzinvalid.xml', colum 3, line 45: InvalidTag - Expected closing tag 'Height' (opened in line 13, col 4) instead of closing tag 'Frame'."
});

console.log("----- test multiple file endings without space");
assert(await validate(undefined, ".xml,valid"), {
    fileCount: 6,
    outErrorStr: "file 'zzzinvalid.xml', colum 3, line 45: InvalidTag - Expected closing tag 'Height' (opened in line 13, col 4) instead of closing tag 'Frame'."
});

console.log("----- test multiple file endings with space");
assert(await validate(undefined, " .xml,  valid   "), {
    fileCount: 6,
    outErrorStr: "file 'zzzinvalid.xml', colum 3, line 45: InvalidTag - Expected closing tag 'Height' (opened in line 13, col 4) instead of closing tag 'Frame'."
});

console.log("----- ALL tests successful!");
