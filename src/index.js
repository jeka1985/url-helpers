const keys = require('./utils/keys');
const isObject = require('./utils/isObject');
const objectGet = require('./utils/objectGet');
const objectSet = require('./utils/objectSet');

module.exports = {
  stringify: (href) => {
    let pathString = href.pathname[href.pathname.length - 1] == '/' ? href.pathname : `${href.pathname}/`,
        hashString = href.hash ? `#${href.hash}` : '',
        queryStrings = keys(href.query || {}).reduce((res, key) => {
          let value = href.query[key],
              flatObject = input => {
                let result = {};
                
                let trace = (data, path=[]) => {
                  if (isObject(data)) {
                    keys(data).forEach(key => trace(data[key], path.concat([key])));
                  } else {
                    let val = objectGet(input, path);
    
                    result[path.join('.')] = Array.isArray(val) ? val.join() : val;
                  }
                } 
                
                keys(input).forEach(inKey => trace(input[inKey], [inKey]));
                
                return keys(result).map(inKey => `${[key].concat(inKey).join('.')}=${result[inKey]}`).join('&');
              };
  
          if (value !== undefined) {
            res.push(Array.isArray(value) ? 
            `${key}=${value.join()}`: 
            isObject(value) ? flatObject(value) : `${key}=${value}`);
          }
  
          return res;
        }, []);
    
    return `${pathString}${!!queryStrings.length ? `?${queryStrings.join('&')}` : ''}${hashString}`; 
  },
  
  parse: (string) => {
    let pathAndSearchWithHash = string.split('?') || [,],
      pathname = pathAndSearchWithHash[0],
      searchAndHash = (pathAndSearchWithHash[1] || '').split('#') || [,],
      search = searchAndHash[0],
      hash = searchAndHash[1];
  
    return {
      pathname,
      hash,
      query: search.split('&').reduce((res, item) => {
        let pair = item.split('='),
            key = pair[0],
            value = pair[1],
            isMultiValue = (/,/g).test(value),
            formatValue = input => {
              let trimmed = input.trim(),
                  isNumber = (/^[0-9]+$/g).test(trimmed);
  
              return isNumber ? +trimmed : trimmed;
            };
  
        objectSet(res, key, isMultiValue ? 
            value.split(',').map(formatValue) : formatValue(value))
        
        return res;    
      }, {})
    };
  }
}