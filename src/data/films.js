export const filmDatabase = [
  // === Fujifilm ===
  { id: 1, name: 'Fujicolor C200', type: 'Color Negative', process: 'C-41', iso: 200, aliases: '후지 C200, 씨이백, C200, 후지컬러, 기록용 200, 업무용 200, fuji' },
  { id: 2, name: 'Fujifilm 400', type: 'Color Negative', process: 'C-41', iso: 400, aliases: '후지필름 400, 수퍼리아 400, 슈퍼리아 400, fuji 400' },
  { id: 3, name: 'Fujicolor 100', type: 'Color Negative', process: 'C-41', iso: 100, aliases: '후지컬러 100, 기록용 100, 업무용 100, 백방, fuji 100' },
  { id: 4, name: 'Fujicolor Superia Premium 400', type: 'Color Negative', process: 'C-41', iso: 400, aliases: '수퍼리아 프리미엄, 슈페리아, 슈퍼리아, 프리미엄 400, 수프 400, fuji' },
  { id: 5, name: 'Fujifilm Provia 100F', type: 'Color Reversal', process: 'E-6', iso: 100, aliases: '프로비아 100F, RDPIII, rdp3, 슬라이드, fuji' },
  { id: 6, name: 'Fujifilm Velvia 50', type: 'Color Reversal', process: 'E-6', iso: 50, aliases: 'RVP 50, 벨비아 50, 슬라이드, fuji' },
  { id: 7, name: 'Fujifilm Velvia 100', type: 'Color Reversal', process: 'E-6', iso: 100, aliases: 'RVP 100, 벨비아 100, RVP100F, 슬라이드, fuji' },
  { id: 8, name: 'Fujifilm Neopan 100 Acros II', type: 'Black & White', process: 'B&W', iso: 100, aliases: '아크로스 100, 아크로스2, 네오판, acros' },

  // === Kodak (Consumer & Pro) ===
  { id: 10, name: 'Kodak ColorPlus 200', type: 'Color Negative', process: 'C-41', iso: 200, aliases: '컬플, 컬러플러스 200, 코닥 200, cp200, 코닥' },
  { id: 11, name: 'Kodak Gold 200', type: 'Color Negative', process: 'C-41', iso: 200, aliases: '골드 200, 금200, 코닥골드, 코닥' },
  { id: 12, name: 'Kodak Ultramax 400', type: 'Color Negative', process: 'C-41', iso: 400, aliases: '울맥, 울트라마스 400, 코닥울맥, 울트라맥스, gc400, 코닥' },
  { id: 13, name: 'Kodak Pro Image 100', type: 'Color Negative', process: 'C-41', iso: 100, aliases: '프로이미지 100, 프이백, 코닥' },
  { id: 14, name: 'Kodak Portra 160', type: 'Color Negative', process: 'C-41', iso: 160, aliases: '포트라 160, 포트라160, portra160, nc, vc, 인물용, 코닥' },
  { id: 15, name: 'Kodak Portra 400', type: 'Color Negative', process: 'C-41', iso: 400, aliases: '포트라 400, 포트라400, portra400, 인물용, 코닥' },
  { id: 16, name: 'Kodak Portra 800', type: 'Color Negative', process: 'C-41', iso: 800, aliases: '포트라 800, 포트라800, portra800, 인물용, 코닥' },
  { id: 17, name: 'Kodak Ektar 100', type: 'Color Negative', process: 'C-41', iso: 100, aliases: '엑타 100, 엑타, 에크타, ektar100, 풍경용, 코닥' },
  { id: 18, name: 'Kodak Ektachrome E100', type: 'Color Reversal', process: 'E-6', iso: 100, aliases: '엑타크롬, e100g, 엑타크롬 e100, 슬라이드, 코닥' },
  { id: 19, name: 'Kodak Tri-X 400 (400TX)', type: 'Black & White', process: 'B&W', iso: 400, aliases: '트라이엑스, 400tx, trix, tx400, 코닥 흑백' },
  { id: 20, name: 'Kodak T-Max 100', type: 'Black & White', process: 'B&W', iso: 100, aliases: '티맥스 100, tmx, tmax100, 코닥 흑백' },
  { id: 21, name: 'Kodak T-Max 400', type: 'Black & White', process: 'B&W', iso: 400, aliases: '티맥스 400, tmy, tmax400, 코닥 흑백' },
  { id: 22, name: 'Kodak T-Max P3200', type: 'Black & White', process: 'B&W', iso: 3200, aliases: '티맥스 3200, tmz, tmax3200, p3200, 코닥 흑백' },

  // === Kodak Vision / Cinematic ===
  { id: 23, name: 'Kodak Vision3 50D (5203)', type: 'Cinematic/Color Negative', process: 'ECN-2', iso: 50, aliases: '비전3 50d, 비전 50, 5203, 7203, 영화용, 코닥' },
  { id: 24, name: 'Kodak Vision3 200T (5213)', type: 'Cinematic/Color Negative', process: 'ECN-2', iso: 200, aliases: '비전3 200t, 비전 200, 5213, 7213, 텅스텐, 영화용, 코닥' },
  { id: 25, name: 'Kodak Vision3 250D (5207)', type: 'Cinematic/Color Negative', process: 'ECN-2', iso: 250, aliases: '비전3 250d, 비전 250, 5207, 7207, 데이라이트, 영화용, 코닥' },
  { id: 26, name: 'Kodak Vision3 500T (5219)', type: 'Cinematic/Color Negative', process: 'ECN-2', iso: 500, aliases: '비전3 500t, 비전 500, 5219, 7219, 텅스텐, 영화용, 코닥' },
  { id: 27, name: 'Kodak Eastman Double-X (5222)', type: 'Cinematic/Black & White', process: 'B&W', iso: 250, aliases: '더블엑스, 이스트만, 5222, xx, 영화용 흑백, 코닥' },

  // === Ilford ===
  { id: 30, name: 'Ilford Pan F Plus', type: 'Black & White', process: 'B&W', iso: 50, aliases: '판에프, 판f, pan f, 일포드' },
  { id: 31, name: 'Ilford FP4 Plus', type: 'Black & White', process: 'B&W', iso: 125, aliases: '에프피포, 에프피에프, fp4, fp4+, 일포드' },
  { id: 32, name: 'Ilford HP5 Plus', type: 'Black & White', process: 'B&W', iso: 400, aliases: '에이치피파이브, hp5, hp5+, 일포드' },
  { id: 33, name: 'Ilford Delta 100 Professional', type: 'Black & White', process: 'B&W', iso: 100, aliases: '델타 100, delta 100, 일포드' },
  { id: 34, name: 'Ilford Delta 400 Professional', type: 'Black & White', process: 'B&W', iso: 400, aliases: '델타 400, delta 400, 일포드' },
  { id: 35, name: 'Ilford Delta 3200 Professional', type: 'Black & White', process: 'B&W', iso: 3200, aliases: '델타 3200, delta 3200, 일포드' },
  { id: 36, name: 'Ilford XP2 Super', type: 'Black & White', process: 'C-41', iso: 400, aliases: '엑스피투, xp2, c41 흑백, 컬러현상 흑백, 일포드' },
  { id: 37, name: 'Ilford SFX 200', type: 'Black & White Infrared', process: 'B&W', iso: 200, aliases: '에스에프엑스, sfx 200, 적외선, 일포드' },
  { id: 38, name: 'Ilford Ortho Plus', type: 'Black & White Orthochromatic', process: 'B&W', iso: 80, aliases: '오르토, ortho, 일포드' },

  // === Kentmere ===
  { id: 40, name: 'Kentmere Pan 100', type: 'Black & White', process: 'B&W', iso: 100, aliases: '켄트미어 100, 켄미 100' },
  { id: 41, name: 'Kentmere Pan 400', type: 'Black & White', process: 'B&W', iso: 400, aliases: '켄트미어 400, 켄미 400' },

  // === CineStill ===
  { id: 45, name: 'CineStill 50D', type: 'Color Negative', process: 'C-41', iso: 50, aliases: '씨네스틸 50d, 시네스틸 50d' },
  { id: 46, name: 'CineStill 400D', type: 'Color Negative', process: 'C-41', iso: 400, aliases: '씨네스틸 400d, 시네스틸 400d' },
  { id: 47, name: 'CineStill 800T', type: 'Color Negative', process: 'C-41', iso: 800, aliases: '씨네스틸 800t, 시네스틸 800t, 텅스텐' },
  { id: 48, name: 'CineStill BwXX', type: 'Cinematic/Black & White', process: 'B&W', iso: 250, aliases: '씨네스틸 더블엑스, bwxx, 흑백' },

  // === Fomapan ===
  { id: 50, name: 'Fomapan 100 Classic', type: 'Black & White', process: 'B&W', iso: 100, aliases: '포마 100, 포마팬 100, foma' },
  { id: 51, name: 'Fomapan 200 Creative', type: 'Black & White', process: 'B&W', iso: 200, aliases: '포마 200, 포마팬 200, foma' },
  { id: 52, name: 'Fomapan 400 Action', type: 'Black & White', process: 'B&W', iso: 400, aliases: '포마 400, 포마팬 400, foma' },
  { id: 53, name: 'Fomapan R 100', type: 'B&W Reversal', process: 'B&W Reversal', iso: 100, aliases: '포마 반전, 포마 리버셜, foma r100' },
  { id: 54, name: 'Retropan 320 soft', type: 'Black & White', process: 'B&W', iso: 320, aliases: '레트로판 320, 포마팬' },

  // === Lomography ===
  { id: 60, name: 'Lomography Color Negative 100', type: 'Color Negative', process: 'C-41', iso: 100, aliases: '로모 100, 로모그래피 100' },
  { id: 61, name: 'Lomography Color Negative 400', type: 'Color Negative', process: 'C-41', iso: 400, aliases: '로모 400, 로모그래피 400' },
  { id: 62, name: 'Lomography Color Negative 800', type: 'Color Negative', process: 'C-41', iso: 800, aliases: '로모 800, 로모그래피 800' },
  { id: 63, name: 'Lomography LomoChrome Purple', type: 'Color Negative', process: 'C-41', iso: 400, aliases: '로모 퍼플, 보라필름' },
  { id: 64, name: 'Lomography LomoChrome Metropolis', type: 'Color Negative', process: 'C-41', iso: 400, aliases: '로모 메트로폴리스, 메트로폴리스' },
  { id: 65, name: 'Lomography LomoChrome Turquoise', type: 'Color Negative', process: 'C-41', iso: 400, aliases: '로모 터콰이즈, 터키석' },
  { id: 66, name: "Lomography LomoChrome Color '92", type: 'Color Negative', process: 'C-41', iso: 400, aliases: '로모 컬러 92' },
  { id: 67, name: 'Lomography Earl Grey 100', type: 'Black & White', process: 'B&W', iso: 100, aliases: '얼그레이 100' },
  { id: 68, name: 'Lomography Lady Grey 400', type: 'Black & White', process: 'B&W', iso: 400, aliases: '레이디그레이 400' },
  { id: 69, name: 'Lomography Babylon 13', type: 'Cinematic/Black & White', process: 'B&W', iso: 13, aliases: '바빌론 13' },
  { id: 70, name: 'Lomography Fantôme 8', type: 'Cinematic/Black & White', process: 'B&W', iso: 8, aliases: '팬텀 8, 판톰 8' },
  { id: 71, name: 'Lomography Potsdam Kino 100', type: 'Cinematic/Black & White', process: 'B&W', iso: 100, aliases: '포츠담 100' },
  { id: 72, name: 'Lomography Berlin Kino 400', type: 'Cinematic/Black & White', process: 'B&W', iso: 400, aliases: '베를린 400' },

  // === Rollei ===
  { id: 75, name: 'Rollei Retro 80S', type: 'Black & White', process: 'B&W', iso: 80, aliases: '롤라이 레트로 80s' },
  { id: 76, name: 'Rollei Retro 400S', type: 'Black & White', process: 'B&W', iso: 400, aliases: '롤라이 레트로 400s' },
  { id: 77, name: 'Rollei RPX 25', type: 'Black & White', process: 'B&W', iso: 25, aliases: '롤라이 알피엑스 25' },
  { id: 78, name: 'Rollei RPX 100', type: 'Black & White', process: 'B&W', iso: 100, aliases: '롤라이 알피엑스 100' },
  { id: 79, name: 'Rollei RPX 400', type: 'Black & White', process: 'B&W', iso: 400, aliases: '롤라이 알피엑스 400' },
  { id: 80, name: 'Rollei Superpan 200', type: 'Black & White', process: 'B&W', iso: 200, aliases: '수퍼팬 200, 롤라이' },
  { id: 81, name: 'Rollei Infrared', type: 'Black & White Infrared', process: 'B&W', iso: 400, aliases: '적외선 400, 롤라이 인프라레드' },
  { id: 82, name: 'Rollei Ortho 25', type: 'Black & White Orthochromatic', process: 'B&W', iso: 25, aliases: '오르토 25, 롤라이' },

  // === Adox ===
  { id: 85, name: 'Adox CMS 20 II', type: 'Black & White', process: 'B&W', iso: 20, aliases: '아독스 cms 20' },
  { id: 86, name: 'Adox HR-50', type: 'Black & White', process: 'B&W', iso: 50, aliases: '아독스 hr50' },
  { id: 87, name: 'Adox Silvermax 100', type: 'Black & White', process: 'B&W', iso: 100, aliases: '아독스 실버맥스 100' },
  { id: 88, name: 'Adox Color Mission 200', type: 'Color Negative', process: 'C-41', iso: 200, aliases: '아독스 컬러미션 200' },

  // === AgfaPhoto ===
  { id: 90, name: 'AgfaPhoto APX 100', type: 'Black & White', process: 'B&W', iso: 100, aliases: '아그파 apx 100, 아그파 100' },
  { id: 91, name: 'AgfaPhoto APX 400', type: 'Black & White', process: 'B&W', iso: 400, aliases: '아그파 apx 400, 아그파 400' },

  // === Orwo ===
  { id: 93, name: 'Orwo Wolfen NC500', type: 'Color Negative', process: 'C-41', iso: 400, aliases: '오르오 500, 올오 nc500' },
  { id: 94, name: 'Orwo Wolfen NC400', type: 'Color Negative', process: 'C-41', iso: 400, aliases: '오르오 400, 올오 nc400' },
  { id: 95, name: 'Orwo Wolfen UN54', type: 'Cinematic/Black & White', process: 'B&W', iso: 100, aliases: '오르오 un54, 영화용 흑백' },
  { id: 96, name: 'Orwo Wolfen NP100', type: 'Black & White', process: 'B&W', iso: 100, aliases: '오르오 np100' },

  // === Harman / Others ===
  { id: 98, name: 'Harman Phoenix 200', type: 'Color Negative', process: 'C-41', iso: 200, aliases: '하만 피닉스 200, 불사조' },
  { id: 99, name: 'SantaColor 100', type: 'Color Negative', process: 'C-41', iso: 100, aliases: '산타컬러 100, 산타칼라' },
  { id: 100, name: 'Flic Film Elektra 100', type: 'Color Negative', process: 'C-41', iso: 100, aliases: '플릭필름 일렉트라' },
  { id: 101, name: 'FILM Ferrania P30', type: 'Black & White', process: 'B&W', iso: 80, aliases: '페라니아 p30' },
  { id: 102, name: 'FILM Ferrania Orto', type: 'Black & White Orthochromatic', process: 'B&W', iso: 50, aliases: '페라니아 오르토' },

  // === Silbersalz35 ===
  { id: 105, name: 'Silbersalz35 50D', type: 'Cinematic/Color Negative', process: 'ECN-2', iso: 50, aliases: '실버잘츠 50d, 실버잘트' },
  { id: 106, name: 'Silbersalz35 250D', type: 'Cinematic/Color Negative', process: 'ECN-2', iso: 250, aliases: '실버잘츠 250d, 데이라이트' },
  { id: 107, name: 'Silbersalz35 200T', type: 'Cinematic/Color Negative', process: 'ECN-2', iso: 200, aliases: '실버잘츠 200t, 텅스텐' },
  { id: 108, name: 'Silbersalz35 500T', type: 'Cinematic/Color Negative', process: 'ECN-2', iso: 500, aliases: '실버잘츠 500t, 텅스텐' },

  // === Reflx Lab ===
  { id: 110, name: 'Reflx Lab 100RW', type: 'Color Negative', process: 'C-41', iso: 100, aliases: '리플렉스랩 100rw' },
  { id: 111, name: 'Reflx Lab 400D', type: 'Cinematic/Color Negative', process: 'ECN-2', iso: 400, aliases: '리플렉스랩 400d, 영화용' },
  { id: 112, name: 'Reflx Lab 800T', type: 'Cinematic/Color Negative', process: 'ECN-2', iso: 800, aliases: '리플렉스랩 800t, 영화용' },
  { id: 113, name: 'Reflx Lab Pro 100', type: 'Color Negative', process: 'C-41', iso: 100, aliases: '리플렉스랩 프로 100' },

  // === Amber ===
  { id: 115, name: 'Amber D100', type: 'Cinematic/Color Negative', process: 'ECN-2', iso: 100, aliases: '앰버 d100, 엠버, 영화용' },
  { id: 116, name: 'Amber T200', type: 'Cinematic/Color Negative', process: 'ECN-2', iso: 200, aliases: '앰버 t200, 엠버, 영화용' },
  { id: 117, name: 'Amber D400', type: 'Cinematic/Color Negative', process: 'ECN-2', iso: 400, aliases: '앰버 d400, 엠버, 영화용' },
  { id: 118, name: 'Amber T800', type: 'Cinematic/Color Negative', process: 'ECN-2', iso: 800, aliases: '앰버 t800, 엠버, 영화용' },

  // === Candido ===
  { id: 120, name: 'Candido 200', type: 'Color Negative', process: 'C-41', iso: 200, aliases: '칸디도 200, 캔디도' },
  { id: 121, name: 'Candido 400', type: 'Color Negative', process: 'C-41', iso: 400, aliases: '칸디도 400, 캔디도' },
  { id: 122, name: 'Candido 800', type: 'Color Negative', process: 'C-41', iso: 800, aliases: '칸디도 800, 캔디도' },

  // === Dubblefilm ===
  { id: 125, name: 'Dubblefilm Bubblegum', type: 'Color Negative (Pre-exposed)', process: 'C-41', iso: 200, aliases: '더블필름 버블검' },
  { id: 126, name: 'Dubblefilm Apollo', type: 'Color Negative (Pre-exposed)', process: 'C-41', iso: 200, aliases: '더블필름 아폴로' },
  { id: 127, name: 'Dubblefilm Pacific', type: 'Color Negative (Pre-exposed)', process: 'C-41', iso: 200, aliases: '더블필름 퍼시픽, 패시픽' },

  // === KONO! ===
  { id: 130, name: 'KONO! Delight Art 100', type: 'Color Negative', process: 'C-41', iso: 100, aliases: '코노 딜라이트 100' },
  { id: 131, name: 'KONO! Monolit 64', type: 'Black & White', process: 'B&W', iso: 64, aliases: '코노 모노릿 64' },

  // === Revolog ===
  { id: 133, name: 'Revolog Volvox', type: 'Color Negative (Pre-exposed)', process: 'C-41', iso: 200, aliases: '레볼로그 볼복스' },
  { id: 134, name: 'Revolog Tesla 1', type: 'Color Negative (Pre-exposed)', process: 'C-41', iso: 200, aliases: '레볼로그 테슬라 1' },
  { id: 135, name: 'Revolog Kolor', type: 'Color Negative (Pre-exposed)', process: 'C-41', iso: 200, aliases: '레볼로그 컬러, 칼라' },

  // === Film Washi ===
  { id: 137, name: 'Film Washi A', type: 'Black & White', process: 'B&W', iso: 12, aliases: '필름 와시 a, 와시필름' },
  { id: 138, name: 'Film Washi D', type: 'Black & White Aerial', process: 'B&W', iso: 500, aliases: '필름 와시 d' },
  { id: 139, name: 'Film Washi F', type: 'Black & White Medical', process: 'B&W', iso: 100, aliases: '필름 와시 f' },
  { id: 140, name: 'Film Washi S', type: 'Black & White Sound Recording', process: 'B&W', iso: 50, aliases: '필름 와시 s' },

  // === JCH / Kosmo Foto / CatLABS ===
  { id: 142, name: 'Japan Camera Hunter StreetPan 400', type: 'Black & White', process: 'B&W', iso: 400, aliases: 'jch, 스트리트팬, 저펜카메라헌터' },
  { id: 143, name: 'Kosmo Foto Mono 100', type: 'Black & White', process: 'B&W', iso: 100, aliases: '코스모포토 모노 100' },
  { id: 144, name: 'Kosmo Foto Agent Shadow 400', type: 'Black & White', process: 'B&W', iso: 400, aliases: '코스모포토 에이전트 섀도우 400' },
  { id: 145, name: 'CatLABS X Film 80', type: 'Black & White', process: 'B&W', iso: 80, aliases: '캣랩스 80, 캣랩스' },
  { id: 146, name: 'CatLABS X Film 320', type: 'Black & White', process: 'B&W', iso: 320, aliases: '캣랩스 320, 캣랩스' },

  // === Shanghai ===
  { id: 148, name: 'Shanghai GP3 100', type: 'Black & White', process: 'B&W', iso: 100, aliases: '상하이 gp3 100, 샹하이' },
  { id: 149, name: 'Shanghai GP3 400', type: 'Black & White', process: 'B&W', iso: 400, aliases: '상하이 gp3 400, 샹하이' },

  // === Astrum ===
  { id: 151, name: 'Astrum Foto 100', type: 'Black & White', process: 'B&W', iso: 100, aliases: '아스트럼 포토 100' },
  { id: 152, name: 'Astrum Foto 200', type: 'Black & White', process: 'B&W', iso: 200, aliases: '아스트럼 포토 200' },
  { id: 153, name: 'Astrum Foto 400', type: 'Black & White', process: 'B&W', iso: 400, aliases: '아스트럼 포토 400' },

  // === Yashica ===
  { id: 155, name: 'Yashica Golden 80s', type: 'Color Negative', process: 'C-41', iso: 400, aliases: '야시카 골든 80, 야시카 400' },
];
