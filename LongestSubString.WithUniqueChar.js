function longestUniqueSubstring(s) {
    let charArr = [];
    let left = 0, maxLength = 0, start = 0, end = 0;
    
    for (let right = 0; right < s.length; right++) {
        while (charArr.includes(s[right])) {
            charArr.shift();
            left++;
        }
        charArr.push(s[right]);
        if (charArr.length > maxLength) {
            maxLength = charArr.length;
            start = left;
            end = right;
        }
    }
    
    return s.substring(start, end + 1);
}

console.log(longestUniqueSubstring("abcabcbb")); 


Question : 
// Longest Substring Without Repeating Characters: Given a string, find the length of the longest substring without repeating characters. 
// For example, given "abcabcbb," the answer is "abc," which has a length of 3.
