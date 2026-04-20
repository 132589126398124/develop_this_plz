import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Save, Printer, Plus, Trash2, PenBox, Image as ImageIcon, FolderOpen, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { filmDatabase } from './data/films';
import { Analytics } from "@vercel/analytics/react";

const FloatingInput = ({ label, value, onChange, type = "text", wrapperStyle, ...props }) => (
  <div className="floating-container" style={wrapperStyle}>
    <input
      type={type}
      className={`floating-input ${props.className || ''}`}
      placeholder=" "
      value={value}
      onChange={onChange}
      {...props}
    />
    <label className="floating-label">{label}</label>
  </div>
);

const FloatingTextarea = ({ label, value, onChange, wrapperStyle, ...props }) => (
  <div className="floating-container" style={wrapperStyle}>
    <textarea
      className={`floating-input ${props.className || ''}`}
      placeholder=" "
      value={value}
      onChange={onChange}
      {...props}
    />
    <label className="floating-label">{label}</label>
  </div>
);

const FilmAutocomplete = ({ label, value, onSelect, onChange }) => {
  const [show, setShow] = useState(false);
  
  // Normalize string for search by removing non-alphanumeric (keep korean) and lowering case
  const normalize = (str) => String(str || '').replace(/[\s\-_]/g, '').toLowerCase();
  
  const filtered = React.useMemo(() => {
    if (!value) return [];
    
    // exact or partial matches
    const searchStr = normalize(value);
    if (!searchStr) return [];
    
    const matches = filmDatabase.filter(f => {
       if (normalize(f.name).includes(searchStr)) return true;
       if (f.aliases && normalize(f.aliases).includes(searchStr)) return true;
       return false;
    });
    
    return matches.slice(0, 10);
  }, [value]);

  const handleBlur = () => {
    setTimeout(() => setShow(false), 200); // delay to allow click on item
  };

  return (
    <div style={{ position: 'relative', flex: 1 }}>
      <FloatingInput 
        label={label} 
        value={value} 
        onChange={onChange}
        onFocus={() => setShow(true)}
        onBlur={handleBlur}
      />
      {show && filtered.length > 0 && (
         <div style={{
            position: 'absolute', zIndex: 100, top: '100%', left: 0, right: 0, 
            background: '#fff', border: '1px solid var(--color-border)', 
            borderRadius: 'var(--radius-md)', marginTop: '4px', 
            boxShadow: 'var(--shadow-card)', maxHeight: '250px', overflowY: 'auto'
         }}>
            {filtered.map(f => (
               <div 
                  key={f.id} 
                  style={{ padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid #f2f4f6' }}
                  onMouseDown={(e) => {
                     e.preventDefault(); // prevent blur before click
                     onSelect(f.name);
                     setShow(false);
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
               >
                  <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{f.name}</div>
               </div>
            ))}
         </div>
      )}
    </div>
  );
};

const CustomModal = ({ isOpen, type, title, message, inputPlaceholder, onConfirm, onCancel }) => {
  const [inputValue, setInputValue] = useState('');
  useEffect(() => { if(isOpen) setInputValue(''); }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        {type === 'prompt' && (
          <input 
            type="text" 
            className="input-field" 
            placeholder={inputPlaceholder} 
            value={inputValue} 
            onChange={e => setInputValue(e.target.value)}
            style={{ marginTop: '16px', padding: '16px', boxSizing: 'border-box' }}
            autoFocus
          />
        )}
        <div className="modal-actions">
          {type !== 'alert' && (
            <button className="btn-outline" onClick={onCancel} style={{ flex: 1, backgroundColor: '#f2f4f6', border: 'none' }}>취소</button>
          )}
          <button className="btn-primary" onClick={() => onConfirm(inputValue)}>확인</button>
        </div>
      </div>
    </div>
  );
};

const LiquidSegmentedControl = ({ options, value, onChange, style }) => {
  const index = options.findIndex(o => o.value === value);
  return (
    <div style={{ position: 'relative', display: 'flex', background: '#f2f4f6', borderRadius: '12px', padding: '4px', ...style }}>
      <div style={{
        position: 'absolute', top: '4px', bottom: '4px', left: '4px',
        width: `calc((100% - 8px) / ${options.length})`,
        transform: `translateX(calc(${index} * 100%))`,
        background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }} />
      {options.map((opt) => (
        <button key={opt.value} onClick={() => onChange(opt.value)} style={{ flex: 1, position: 'relative', zIndex: 1, padding: '10px 2px', background: 'transparent', border: 'none', fontWeight: value === opt.value ? 700 : 600, color: value === opt.value ? 'var(--color-text-primary)' : 'var(--color-text-secondary)', transition: 'color 0.3s', cursor: 'pointer', fontSize: 'clamp(12px, 3.5vw, 15px)', whiteSpace: 'nowrap' }}>
          {opt.label}
        </button>
      ))}
    </div>
  );
};

function App() {
  const [formData, setFormData] = useState({
    blankFilmCount: 0,
    customer: { name: '', phone: '', email: '' },
    films: [], // 초기 상태 필름 개수 0개
    returnMethod: '택배 수령',
    address: '',
    memo: ''
  });

  const [templates, setTemplates] = useState([]);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [copies, setCopies] = useState(1);
  const [showMaxWarn, setShowMaxWarn] = useState(false);

  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'alert', title: '', message: '', inputPlaceholder: '', onConfirm: () => {}, onCancel: () => {} });
  const closeModal = () => setModalConfig(prev => ({ ...prev, isOpen: false }));
  const showAlert = (title, message) => setModalConfig({ isOpen: true, type: 'alert', title, message, onConfirm: closeModal, onCancel: closeModal });
  const showConfirm = (title, message, onConfirm) => setModalConfig({ isOpen: true, type: 'confirm', title, message, onConfirm: () => { onConfirm(); closeModal(); }, onCancel: closeModal });
  const showPrompt = (title, message, inputPlaceholder, onConfirm) => setModalConfig({ isOpen: true, type: 'prompt', title, message, inputPlaceholder, onConfirm: (val) => { onConfirm(val); closeModal(); }, onCancel: closeModal });

  useEffect(() => {
    const saved = localStorage.getItem('filmMemoTemplates');
    if (saved) {
      try { setTemplates(JSON.parse(saved)); } catch (e) {}
    } else {
      const oldSaved = localStorage.getItem('filmMemoTemplate');
      if (oldSaved) {
        try { 
          const parsed = JSON.parse(oldSaved);
          const migrated = [{ id: crypto.randomUUID(), name: '기존 저장된 템플릿', data: parsed }];
          setTemplates(migrated);
          localStorage.setItem('filmMemoTemplates', JSON.stringify(migrated));
          localStorage.removeItem('filmMemoTemplate');
        } catch (e) {}
      }
    }
  }, []);

  const totalFilmsCount = formData.films.length + formData.blankFilmCount;

  const triggerWarn = () => {
    setShowMaxWarn(true);
    setTimeout(() => setShowMaxWarn(false), 2000); // 2초 뒤 경고 애니메이션 해제
  };

  const addFilm = () => {
    if (totalFilmsCount >= 6) { triggerWarn(); return; }
    setFormData(prev => ({
      ...prev,
      films: [...prev.films, {
        id: crypto.randomUUID(), filmName: '', boxIso: '', ei: '', quantity: 1,
        filmSize: '135', format: 'JPG', process: 'C-41', pushPullType: 'Normal', pushPullStops: '', isHalfFrame: false
      }]
    }));
  };

  const incBlankFilm = () => {
    if (totalFilmsCount >= 6) { triggerWarn(); return; }
    setFormData({...formData, blankFilmCount: formData.blankFilmCount + 1});
  };

  const decBlankFilm = () => {
    setFormData({...formData, blankFilmCount: Math.max(0, formData.blankFilmCount - 1)});
  };

  const removeFilm = (id) => {
    setFormData(prev => ({ ...prev, films: prev.films.filter(f => f.id !== id) }));
  };

  const updateFilm = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      films: prev.films.map(f => f.id === id ? { ...f, [field]: value } : f)
    }));
  };

  const handleFilmSelect = (id, selectedFilmName) => {
    const dbFilm = filmDatabase.find(f => f.name === selectedFilmName);
    setFormData(prev => ({
      ...prev,
      films: prev.films.map(f => {
        if (f.id === id) {
          if (dbFilm) {
            return { ...f, filmName: selectedFilmName, boxIso: String(dbFilm.iso), process: dbFilm.process };
          }
          return { ...f, filmName: selectedFilmName };
        }
        return f;
      })
    }));
  };

  const handleSaveTemplate = () => {
    showPrompt("템플릿 저장", "보관함에 저장할 템플릿 이름을 입력하세요.", "예: 흑백 기본 세팅", (name) => {
      if (!name || !name.trim()) return;
      const newTemplate = { id: crypto.randomUUID(), name, data: formData };
      const newTemplates = [...templates, newTemplate];
      setTemplates(newTemplates);
      localStorage.setItem('filmMemoTemplates', JSON.stringify(newTemplates));
      showAlert("저장 완료", `'${name}' 템플릿이 추가되었습니다.`);
      setIsTemplateOpen(true);
    });
  };

  const loadTemplate = (templateData) => {
    showConfirm("템플릿 불러오기", "현재 작성 중인 내용이 지워지고 템플릿 내용으로 덮어쓰기 됩니다. 정말 불러오시겠습니까?", () => {
      setFormData(templateData);
    });
  };

  const deleteTemplate = (id) => {
    showConfirm("템플릿 삭제", "이 템플릿을 보관함에서 영구적으로 삭제하시겠습니까?", () => {
      const newTemplates = templates.filter(t => t.id !== id);
      setTemplates(newTemplates);
      localStorage.setItem('filmMemoTemplates', JSON.stringify(newTemplates));
    });
  };

  const updateCustomer = (field, value) => {
    setFormData(prev => ({ ...prev, customer: { ...prev.customer, [field]: value } }));
  };

  const getTimestampFileName = (ext) => {
    const now = new Date();
    const ts = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getDate()).padStart(2,'0')}_${String(now.getHours()).padStart(2,'0')}${String(now.getMinutes()).padStart(2,'0')}`;
    return `의뢰서_${ts}.${ext}`;
  };

  const generateCanvas = async () => {
    const { default: html2canvas } = await import('html2canvas');
    const element = document.getElementById('receipt-export-source');
    
    // 원본 영수증 1장을 고화질로 캡처 (A4 비율 유지됨)
    // 약간의 잘림 방지를 위해 크기를 1px 작게 처리
    const singleCanvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
    if (copies === 1) return singleCanvas;

    // 다중 인쇄를 위한 A4 베이스 캔버스 생성 (원본과 동일 해상도)
    const layoutCanvas = document.createElement('canvas');
    layoutCanvas.width = singleCanvas.width; 
    layoutCanvas.height = singleCanvas.height; 
    const ctx = layoutCanvas.getContext('2d');
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, layoutCanvas.width, layoutCanvas.height);

    // 2장이든 4장이든 2x2 격자(절반 축소)를 사용하여 가로/세로 비율을 완벽히 보존합니다
    const cols = 2, rows = 2;
    const slot_w = layoutCanvas.width / cols;
    const slot_h = layoutCanvas.height / rows;

    let count = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (count >= copies) break;
        
        ctx.drawImage(singleCanvas, c * slot_w, r * slot_h, slot_w, slot_h);
        
        ctx.strokeStyle = "#dddddd";
        ctx.setLineDash([10, 10]);
        ctx.strokeRect(c*slot_w, r*slot_h, slot_w, slot_h); // 컷팅 가이드라인
        count++;
      }
    }
    return layoutCanvas;
  };

  const exportDocument = async (type) => {
    try {
      const finalCanvas = await generateCanvas();
      const imgData = finalCanvas.toDataURL('image/jpeg', 0.95);
      
      if (type === 'jpg') {
        const link = document.createElement('a');
        link.download = getTimestampFileName('jpg');
        link.href = imgData;
        link.click();
      } else {
        const { jsPDF } = await import('jspdf');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfW = pdf.internal.pageSize.getWidth();
        const pdfH = (finalCanvas.height * pdfW) / finalCanvas.width;
        
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfW, pdfH);
        
        if (type === 'pdf') {
          pdf.save(getTimestampFileName('pdf'));
        } else if (type === 'print') {
          pdf.autoPrint();
          const blobURL = pdf.output('bloburl');
          window.open(blobURL, '_blank');
        }
      }
    } catch(err) {
      console.error(err);
      showAlert('오류', '문서 생성 중 오류가 발생했습니다.');
    }
  };

  const renderValue = (val, length = 20) => {
    if (val === undefined || val === null || String(val).trim() === '') {
      return ''; // 빈칸 출력 - 수기로 적을 공간 확보
    }
    return String(val);
  };

  const renderPushPull = (f) => {
    if (f.pushPullType === 'Normal') return 'Normal';
    return `${f.pushPullType === 'Push' ? '+' : '-'}${f.pushPullStops || '?'} ${f.pushPullType}`;
  };

  // 재사용 가능한 영수증 컨텐츠 컴포넌트
  const ReceiptContent = () => (
    <>
      <div className="receipt-data-mode" style={{ display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
        <div className="info-block" style={{ fontSize: '15px' }}>
          <p style={{ wordBreak: 'break-all', borderBottom: '1px solid #e0e0e0', paddingBottom: '8px' }}><strong>이름:</strong> {renderValue(formData.customer.name)}</p>
          <p style={{ wordBreak: 'break-all', borderBottom: '1px solid #e0e0e0', paddingBottom: '8px' }}><strong>연락처:</strong> {renderValue(formData.customer.phone)}</p>
          <p style={{ wordBreak: 'break-all', borderBottom: '1px solid #e0e0e0', paddingBottom: '8px' }}><strong>이메일:</strong> {renderValue(formData.customer.email)}</p>
        </div>
        
        <div className="receipt-divider" style={{ margin: '12px 0' }}></div>
        
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>필름 내역</h3>
        {formData.films.map((f, i) => (
          <div key={f.id} className="receipt-film-box" style={{ padding: '16px 20px', marginBottom: '10px' }}>
            <div className="receipt-film-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
              <strong style={{ wordBreak: 'break-all' }}>#{i+1}. {renderValue(f.filmName, 15)} </strong>
              <span className="receipt-qty" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>{f.quantity}롤</span>
            </div>
            <p className="receipt-meta">
              포맷: <strong>[{f.filmSize}]</strong> | ISO: {renderValue(f.boxIso, 5)} {f.ei && `(EI: ${f.ei}) `} | {f.process}
            </p>
            <p className="receipt-options">
              {f.format} {f.format !== 'NO SCAN' && '스캔'}{renderPushPull(f) !== 'Normal' ? ` | 🚨${renderPushPull(f)}` : ''}{f.isHalfFrame ? ' | 하프' : ''}
            </p>
          </div>
        ))}

        {Array.from({length: formData.blankFilmCount}).map((_, i) => (
          <div key={`blank-${i}`} className="receipt-film-box" style={{ padding: '14px 20px', marginBottom: '10px', borderLeftColor: '#bbb', backgroundColor: '#fafafa' }}>
            <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>#{formData.films.length + i + 1}.</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px 16px', fontSize: '13px', color: '#666' }}>
              <span>필름명:</span><span>ISO:</span><span>수량:</span>
              <span>포맷:</span><span>스캔:</span><span>현상:</span>
            </div>
            <div style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>증/감감: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 하프: ☐</div>
          </div>
        ))}
        
        {totalFilmsCount === 0 && (
          <p style={{ textAlign: 'center', color: '#999', fontSize: '14px', padding: '20px 0' }}>등록된 필름 내역이 없습니다.</p>
        )}

        <div className="receipt-divider" style={{ margin: '12px 0' }}></div>
        
        <div className="info-block">
          <p style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '8px' }}><strong>수령 방법:</strong> {formData.returnMethod === '미지정 (빈칸)' ? '' : formData.returnMethod}</p>
          {(formData.returnMethod === '택배 수령' || formData.returnMethod === '미지정 (빈칸)') && <p style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: '8px' }}><strong>주소:</strong> {renderValue(formData.address)}</p>}
          
          <div className="receipt-memo" style={{ minHeight: '50px', marginTop: '12px' }}>
            <strong>추가 메모:</strong>
            <div style={{ marginTop: '4px', padding: '8px', background: 'transparent' }}>
              {formData.memo ? formData.memo : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingTop: '12px', paddingBottom: '4px' }}>
                  <div style={{ borderBottom: '1px solid #e0e0e0', width: '100%' }}></div>
                  <div style={{ borderBottom: '1px solid #e0e0e0', width: '100%' }}></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="layout">
      <Analytics />
      <CustomModal {...modalConfig} />
      
      {/* 엑스포트용 원본 소스 (화면 밖으로 숨김 처리) - A4 사이즈 794x1122 고정 */}
      <div style={{ position: 'fixed', left: '-9999px', top: '-9999px', width: '794px', height: '1122px' }}>
         <div id="receipt-export-source" className="receipt-paper" style={{ borderRadius: 0, padding: '36px 48px', boxSizing: 'border-box', height: '100%', width: '100%' }}>
            <ReceiptContent />
         </div>
      </div>

      <header className="header">
        <h1>필름 현상 의뢰서</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={handleSaveTemplate}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: 'var(--color-bg)', color: 'var(--color-text-primary)', borderRadius: 'var(--radius-md)', fontWeight: '600' }}
          >
            <Save size={18} /> <span>템플릿</span>
          </button>
          <button 
            onClick={() => exportDocument('pdf')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: 'var(--radius-md)', fontWeight: '600' }}
          >
            <FileText size={18} /> <span>PDF 저장</span>
          </button>
          <button 
            onClick={() => exportDocument('jpg')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', borderRadius: 'var(--radius-md)', fontWeight: '600' }}
          >
            <ImageIcon size={18} /> <span>JPG 저장</span>
          </button>
          <button 
            onClick={() => exportDocument('print')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: 'var(--radius-md)', fontWeight: '600' }}
          >
            <Printer size={18} /> <span>인쇄하기</span>
          </button>
        </div>
      </header>
      
      <main className="main-content">
        <section className="form-section">
          <div className="card" style={{ padding: '24px 32px' }}>
            <div 
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => setIsTemplateOpen(!isTemplateOpen)}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FolderOpen size={20} color="var(--color-primary)" />
                <h2 style={{ margin: 0, fontSize: '18px' }}>내 템플릿 보관함 <span style={{ color: 'var(--color-primary)' }}>{templates.length}</span></h2>
              </div>
              <div style={{ color: 'var(--color-text-secondary)' }}>
                {isTemplateOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>
            
            {isTemplateOpen && (
              <div style={{ marginTop: '20px' }}>
                {templates.length === 0 ? (
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px', textAlign: 'center', margin: '20px 0' }}>저장된 템플릿이 없습니다. 우측 상단의 [템플릿 저장]을 눌러보세요.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {templates.map(t => (
                      <div key={t.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 600, fontSize: '16px' }}>{t.name}</span>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={(e) => { e.stopPropagation(); loadTemplate(t.data); }} className="btn-outline" style={{ padding: '6px 12px', fontSize: '13px', backgroundColor: '#fff', borderRadius: 'var(--radius-sm)' }}>불러오기</button>
                            <button onClick={(e) => { e.stopPropagation(); deleteTemplate(t.id); }} className="btn-outline" style={{ padding: '6px', color: 'var(--color-danger)', borderColor: 'rgba(240,68,82,0.3)', backgroundColor: 'transparent', borderRadius: 'var(--radius-sm)' }}><Trash2 size={16} /></button>
                          </div>
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginTop: '4px' }}>
                          <span style={{ display: 'inline-block', marginRight: '8px' }}>👤 {t.data.customer.name || '이름 없음'} ({t.data.customer.phone || '-'}) </span>
                          <span style={{ display: 'inline-block', marginRight: '8px' }}>📦 {t.data.returnMethod} </span><br/>
                          <span style={{ display: 'inline-block', marginTop: '4px' }}>🎞 {t.data.films[0]?.filmName || '필름 미설정'} [{t.data.films[0]?.filmSize || '포맷'}] {t.data.films.length > 1 ? `외 ${t.data.films.length - 1}건` : ''}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="card" style={{ padding: '16px 32px', backgroundColor: '#e2f0fd', color: '#1b64da', marginBottom: '-8px' }}>
            <p style={{ fontWeight: 600, fontSize: '14px' }}>💡 팁: 수기로 작성하고 싶은 칸은 비워두세요! 인쇄 시 밑줄(___)로 자동 변환됩니다.</p>
          </div>

          <div className="card">
            <h2>1. 고객 정보</h2>
            <div className="input-group">
              <FloatingInput label="고객명" value={formData.customer.name} onChange={(e) => updateCustomer('name', e.target.value)} />
              <FloatingInput label="연락처" type="tel" value={formData.customer.phone} onChange={(e) => updateCustomer('phone', e.target.value)} />
              <FloatingInput label="이메일 주소 (스캔파일 수신용)" type="email" value={formData.customer.email} onChange={(e) => updateCustomer('email', e.target.value)} />
            </div>
          </div>

          <div className="card">
            <h2>2. 필름 정보 <span style={{ fontSize: '14px', fontWeight: 400, color: 'var(--color-text-secondary)' }}>(최대 6개)</span></h2>
            <div className="film-list">
              {formData.films.map((film, index) => (
                <div key={film.id} className="film-item">
                  <div className="film-item-header">
                    <h3>필름 #{index + 1}</h3>
                    <button onClick={() => removeFilm(film.id)} className="btn-icon danger"><Trash2 size={16} /></button>
                  </div>
                  <div className="input-group">
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <FilmAutocomplete 
                         label="필름 이름 검색 (예: 코닥 골드, RVP 50)" 
                         value={film.filmName} 
                         onChange={(e) => updateFilm(film.id, 'filmName', e.target.value)}
                         onSelect={(name) => handleFilmSelect(film.id, name)}
                      />
                    </div>

                    <div className="row2" style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                      <select value={film.filmSize} onChange={(e) => updateFilm(film.id, 'filmSize', e.target.value)} className="select-field" style={{ flex: 1 }}>
                        <option value="135">135 (35mm 소형)</option>
                        <option value="120">120 (중형)</option>
                        <option value="110">110 (포켓형)</option>
                      </select>
                      
                      <div className="quantity-control" style={{ flex: 1, justifyContent: 'space-between', padding: '0 16px' }}>
                        <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)', fontWeight: 'bold', whiteSpace: 'nowrap' }}>수량</span>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <button onClick={() => updateFilm(film.id, 'quantity', Math.max(1, film.quantity - 1))} className="qty-btn">-</button>
                          <span className="qty-val">{film.quantity}</span>
                          <button onClick={() => updateFilm(film.id, 'quantity', film.quantity + 1)} className="qty-btn">+</button>
                        </div>
                      </div>
                    </div>

                    <div className="row2" style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                       <FloatingInput label="Box ISO" type="number" inputMode="numeric" value={film.boxIso} onChange={(e) => updateFilm(film.id, 'boxIso', e.target.value)} wrapperStyle={{ flex: 1 }} />
                       <FloatingInput label="EI" type="number" inputMode="numeric" value={film.ei} onChange={(e) => updateFilm(film.id, 'ei', e.target.value)} wrapperStyle={{ flex: 1 }} />
                    </div>

                    <div className="options-row" style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                      <select value={film.format} onChange={(e) => updateFilm(film.id, 'format', e.target.value)} className="select-field" style={{ flex: 1 }}>
                        <option value="JPG">JPG 스캔</option>
                        <option value="TIFF">TIFF 스캔</option>
                        <option value="NO SCAN">현상만 (해당없음)</option>
                      </select>
                      <select value={film.process} onChange={(e) => updateFilm(film.id, 'process', e.target.value)} className="select-field" style={{ flex: 1 }}>
                        <option value="C-41">C-41 (일반)</option>
                        <option value="B&W">B&W (흑백)</option>
                        <option value="ECN-2">ECN-2 (영화)</option>
                        <option value="E-6">E-6 (포지티브)</option>
                        <option value="B&W Reversal">B&W Reversal (흑백 반전)</option>
                      </select>
                    </div>
                    
                    <div className="options-row" style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <select value={film.pushPullType} onChange={(e) => {
                        updateFilm(film.id, 'pushPullType', e.target.value);
                        if (e.target.value === 'Normal') updateFilm(film.id, 'pushPullStops', '');
                      }} className="select-field" style={{ flex: 1 }}>
                        <option value="Normal">증감/감감 없음 (Normal)</option>
                        <option value="Push">+ 증감 현상 (Push)</option>
                        <option value="Pull">- 감감 현상 (Pull)</option>
                      </select>
                      {film.pushPullType !== 'Normal' && (
                        <FloatingInput 
                          label="스탑 수 (숫자만 입력)" 
                          type="number" 
                          inputMode="numeric"
                          value={film.pushPullStops} 
                          onChange={(e) => updateFilm(film.id, 'pushPullStops', e.target.value)} 
                          wrapperStyle={{ flex: 1 }}
                        />
                      )}
                    </div>
                    
                    {film.filmSize !== '120' && (
                      <label className="checkbox-label" style={{ marginTop: '8px' }}>
                        <input type="checkbox" checked={film.isHalfFrame} onChange={(e) => updateFilm(film.id, 'isHalfFrame', e.target.checked)} />
                        <span>하프프레임 카메라 촬영분 포함</span>
                      </label>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px', alignItems: 'stretch' }}>
              <div style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
                <button onClick={addFilm} className="btn-outline" style={{ height: '100%' }}>
                  <Plus size={18} /> 필름 기록 추가하기
                </button>
              </div>
              <div style={{ flex: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0 16px' }}>
                <span style={{ fontSize: '14px', color: 'var(--color-text-secondary)', fontWeight: 600, whiteSpace: 'nowrap' }}><PenBox size={16} style={{display:'inline', verticalAlign:'text-bottom', marginRight:'4px'}}/>수기 빈칸</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <button onClick={decBlankFilm} className="qty-btn" style={{ background: 'transparent' }}>-</button>
                  <span className="qty-val">{formData.blankFilmCount}</span>
                  <button onClick={incBlankFilm} className="qty-btn" style={{ background: 'transparent' }}>+</button>
                </div>
              </div>
            </div>
            <div style={{ height: '20px', paddingLeft: '8px', paddingTop: '8px' }}>
               {showMaxWarn && <div className="warn-text">⚠️ 최대 제한 속성(6개)을 초과할 수 없습니다!</div>}
            </div>
          </div>

          <div className="card">
            <h2>3. 수령 및 기타 요청</h2>
            <LiquidSegmentedControl 
               options={[
                 {label: '택배 수령', value: '택배 수령'},
                 {label: '방문 수령', value: '방문 수령'},
                 {label: '폐기 요청', value: '폐기 요청'},
                 {label: '미지정 (빈칸)', value: '미지정 (빈칸)'}
               ]} 
               value={formData.returnMethod} 
               onChange={(val) => setFormData({...formData, returnMethod: val})}
               style={{ marginBottom: '24px', width: '100%' }}
            />
            {formData.returnMethod === '택배 수령' || formData.returnMethod === '미지정 (빈칸)' ? (
              <FloatingInput label="원래 필름을 돌려받으실 주소 (비울 시 수기 작성)" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} wrapperStyle={{ marginBottom: '16px' }}/>
            ) : null}
            <FloatingTextarea label="현상소에 전달할 추가 메모를 입력하세요 (비워두면 빈칸 출력)" value={formData.memo} onChange={(e) => setFormData({...formData, memo: e.target.value})} rows="3" />
          </div>
        </section>
        
        <section className="preview-section">
          <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: '#fff', padding: '16px 24px', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-card)'}}>
            <strong style={{ fontSize: '15px' }}>🖨️ 한 페이지 당 의뢰서 갯수</strong>
            <LiquidSegmentedControl 
               options={[
                 {label: '크게 1장', value: 1}, 
                 {label: '잘라서 2장', value: 2}, 
                 {label: '작게 4장', value: 4}
               ]} 
               value={copies} 
               onChange={(val) => setCopies(val)}
               style={{ width: '100%' }}
            />
          </div>

          <div className="preview-container" style={{ width: '100%', height: 'calc(100vh - 180px)', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-xl)', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', overflowY: 'auto', padding: '24px', boxSizing: 'border-box' }}>
            <div className="receipt-paper" style={{ width: '100%', maxWidth: '794px', height: 'max-content', minHeight: '100%', aspectRatio: '210/297', padding: '36px 48px', boxSizing: 'border-box', borderRadius: '16px' }}>
               <ReceiptContent />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
