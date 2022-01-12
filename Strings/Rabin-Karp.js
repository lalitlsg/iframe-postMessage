// const strMap = {a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,j:10,k:11,l:12,m:13,n:14,o:15,p:16,q:17,r:18,s:19,t:20,u:21,v:22,w:23,x:24,y:25,z:26}
// String.prototype.charCodeAt = function() {
//     return strMap[this];
// }

class Solution {
    
    search(pat, txt)
    {
        const n = pat.length;
        const ans = [];
        const BASE = 10;
        const MOD = (Math.pow(2, 32) - 1)

        const getHash = (pat) => {
            let hash = 0;
            for(let i=n-1; i>=0; i--) {
                const val = pat[i].charCodeAt() * Math.pow(BASE, n-i-1);
                hash += val;
            }
            return hash;
        }

        const checkPattern = (i, txt, pat, ans) => {
            let a = i;
            let b = 0;
            
            while(a < txt.length && b < pat.length && txt[a] === pat[b]) {
                a++;
                b++;
            }
            
            if(b === pat.length) {
                ans.push(i+1);
            }
        }
        
        let patternHash = getHash(pat);
        
        patternHash %= MOD;

        const firstNChars = txt.substring(0, n);
        let currHash = getHash(firstNChars);
        currHash %= MOD;
        
        // console.log(patternHash, currHash);

        let i = 0;
        let j = n-1;
        
        while(j < txt.length) {
            // console.log(patternHash, currHash, i, j);
            if(patternHash === currHash) {
                checkPattern(i, txt, pat, ans);
            }
            
            const val1 = txt[i].charCodeAt() * Math.pow(BASE, n-1);
            currHash -= val1;
            currHash *= BASE;

            i++;
            j++;
            
            if(j < txt.length) {
                const val2 = txt[j].charCodeAt() * Math.pow(BASE, 0);
                currHash += val2;
                // console.log(currHash)
                currHash %= MOD;
            }
        }
        
        return ans.length > 0 ? ans : [-1];
    }
}

const s = new Solution();
const ans = s.search('bat', 'batmanbat');
console.log("ans", ans);
