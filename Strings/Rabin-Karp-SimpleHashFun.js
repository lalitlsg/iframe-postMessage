/**
 * @param {string} str - Source String
 * @param {string} pat - Pattern
 * @return {number}
 */
 var strStr = function(str, pat) {
  
    if(pat.length === 0) return 0;
    const n = pat.length;
    
    const getHash = (pat) => {
        let hash = 0;
        for(const l of pat) {
            hash += l.charCodeAt();
        }
        return hash;
    }
    
    const patternHash = getHash(pat);
    let currHash = getHash(str.substring(0, n));
    
    let i = 0;
    let j = n-1;
    
    const isEqual = (i, txt, pat) => {
        let a = i;
        let b = 0;
        
        while(a < txt.length && b < pat.length && txt[a] === pat[b]) {
            a++;
            b++;
        }
        
        return b === pat.length;
    }
    
    while(j < str.length) {
        if(patternHash === currHash) {
            if(isEqual(i, str, pat)) {
                return i;
            }
        }
        
        currHash -= str[i].charCodeAt();
        
        i++;
        j++;
        
        if(j < str.length) currHash += str[j].charCodeAt();
    }
    
    return -1;
};