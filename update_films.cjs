const fs = require('fs');
let code = fs.readFileSync('src/data/films.js', 'utf8');

const specificAliases = {
  'Fujicolor Superia Premium 400': '수퍼리아 프리미엄, 슈페리아, 슈퍼리아',
  'Fujifilm Velvia 50': 'RVP 50, 벨비아 50',
  'Kodak ColorPlus 200': '컬플, 컬러플러스 200, 코닥',
  'Kodak Gold 200': '골드 200, 코닥골드',
  'Kodak Ultramax 400': '울맥, 울트라마스 400, 코닥울맥, 울트라맥스',
  'Kodak Portra 160': '포트라 160, 포트라160',
  'Kodak Portra 400': '포트라 400, 포트라400',
  'Kodak Portra 800': '포트라 800, 포트라800',
  'Fujicolor C200': '후지 C200, 씨이백, C200',
  'AgfaPhoto APX 100': '아그파 100',
  'AgfaPhoto APX 400': '아그파 400',
  'Kodak Ektar 100': '엑타, 엑타 100',
  'Kodak Vision3 500T (5219)': '비전3 500t, 비전 500',
  'Kodak Vision3 250D (5207)': '비전3 250d, 비전 250',
  'Kodak Vision3 200T (5213)': '비전3 200t, 비전 200',
  'CineStill 800T': '씨네스틸 800t, 씨네스틸',
  'CineStill 400D': '씨네스틸 400d',
  'CineStill 50D': '씨네스틸 50d',
  'Ilford HP5 Plus': '일포드 HP5',
  'Ilford FP4 Plus': '일포드 FP4',
  'Kodak Tri-X 400 (400TX)': '트라이엑스, 400tx'
};

const brandAliases = {
  'Kodak': '코닥',
  'Fujifilm': '후지필름, 후지',
  'Fujicolor': '후지컬러, 후지',
  'Ilford': '일포드',
  'Kentmere': '켄트미어',
  'CineStill': '씨네스틸',
  'Fomapan': '포마팬',
  'Lomography': '로모그래피, 로모',
  'Rollei': '롤라이',
  'Adox': '아독스',
  'AgfaPhoto': '아그파',
  'Candido': '칸디도',
  'Yashica': '야시카'
};

const updatedCode = code.replace(/name: '([^']+)'(.*?iso: \d+.*?)\s*\}/g, (match, name, rest) => {
  let aliases = [];
  
  if (specificAliases[name]) {
    aliases.push(specificAliases[name]);
  }
  
  for (const [brand, bAlias] of Object.entries(brandAliases)) {
    if (name.includes(brand)) {
      aliases.push(bAlias);
      break; 
    }
  }

  let finalAliasStr = '';
  if (aliases.length > 0) {
    finalAliasStr = `, aliases: '${aliases.join(', ')}'`;
  }
  
  return `name: '${name}'${rest}${finalAliasStr} }`;
});

fs.writeFileSync('src/data/films.js', updatedCode);
console.log('Successfully added aliases to films.js');
