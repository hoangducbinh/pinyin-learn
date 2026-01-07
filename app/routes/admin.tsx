import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router';
// import { useAuth } from '../contexts/AuthContext';
import { 
  fetchPhrases, 
  addPhrase, 
  updatePhrase, 
  deletePhrase,
  bulkImportPhrases,
  type Phrase 
} from '../services/supabase';

export default function AdminPage() {
  // const navigate = useNavigate();
  // const { user, isAdmin, loading: authLoading } = useAuth();
  const [phrases, setPhrases] = useState<Phrase[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    vietnamese: '',
    pinyin: '',
    chinese: '',
    category: '',
    difficulty: 'easy' as 'easy' | 'medium' | 'hard',
  });

  // TẠM THỜI TẮT AUTH CHECK
  /*
  // Bảo vệ route - chỉ admin mới vào được
  useEffect(() => {
    if (!authLoading && !user) {
      alert('Vui lòng đăng nhập để truy cập trang này');
      navigate('/');
    } else if (!authLoading && user && !isAdmin) {
      alert('Bạn không có quyền truy cập trang này');
      navigate('/');
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      loadPhrases();
    }
  }, [user, isAdmin]);
  */

  useEffect(() => {
    loadPhrases();
  }, []);

  const loadPhrases = async () => {
    setLoading(true);
    const data = await fetchPhrases();
    setPhrases(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update
      const success = await updatePhrase(editingId, formData);
      if (success) {
        alert('Cập nhật thành công!');
        setEditingId(null);
        resetForm();
        loadPhrases();
      }
    } else {
      // Add new
      const result = await addPhrase(formData);
      if (result) {
        alert('Thêm thành công!');
        resetForm();
        loadPhrases();
      }
    }
  };

  const handleEdit = (phrase: Phrase) => {
    setEditingId(phrase.id);
    setFormData({
      vietnamese: phrase.vietnamese,
      pinyin: phrase.pinyin,
      chinese: phrase.chinese,
      category: phrase.category,
      difficulty: phrase.difficulty,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xóa câu này?')) return;
    
    const success = await deletePhrase(id);
    if (success) {
      alert('Xóa thành công!');
      loadPhrases();
    }
  };

  const resetForm = () => {
    setFormData({
      vietnamese: '',
      pinyin: '',
      chinese: '',
      category: '',
      difficulty: 'easy',
    });
    setEditingId(null);
  };

  const handleImportCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').slice(1); // Skip header
      
      const phrasesToImport = lines
        .filter(line => line.trim())
        .map(line => {
          const [vietnamese, pinyin, chinese, category, difficulty] = line.split(',').map(s => s.trim());
          return {
            vietnamese,
            pinyin,
            chinese,
            category,
            difficulty: (difficulty as 'easy' | 'medium' | 'hard') || 'easy',
          };
        });

      const success = await bulkImportPhrases(phrasesToImport);
      if (success) {
        alert(`Import thành công ${phrasesToImport.length} câu!`);
        loadPhrases();
      }
    };
    reader.readAsText(file);
  };

  const handleExportCSV = () => {
    const csv = [
      ['Vietnamese', 'Pinyin', 'Chinese', 'Category', 'Difficulty'].join(','),
      ...phrases.map(p => [p.vietnamese, p.pinyin, p.chinese, p.category, p.difficulty].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pinyin-phrases-${Date.now()}.csv`;
    a.click();
  };

  // TẠM THỜI TẮT AUTH LOADING
  /*
  // Hiển thị loading khi đang kiểm tra auth
  if (authLoading || (!user || !isAdmin)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }
  */

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>🔧 Quản lý dữ liệu Pinyin</h1>
        <div className="admin-actions">
          <button onClick={handleExportCSV} className="btn-export">
            📥 Export CSV
          </button>
          <label className="btn-import">
            📤 Import CSV
            <input type="file" accept=".csv" onChange={handleImportCSV} hidden />
          </label>
          <a href="/" className="btn-back">← Về trang học</a>
        </div>
      </header>

      {/* Form */}
      <div className="admin-form-card">
        <h2>{editingId ? '✏️ Sửa câu' : '➕ Thêm câu mới'}</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-row">
            <div className="form-group">
              <label>Tiếng Việt *</label>
              <input
                type="text"
                value={formData.vietnamese}
                onChange={(e) => setFormData({ ...formData, vietnamese: e.target.value })}
                required
                placeholder="Xin chào"
              />
            </div>
            <div className="form-group">
              <label>Pinyin *</label>
              <input
                type="text"
                value={formData.pinyin}
                onChange={(e) => setFormData({ ...formData, pinyin: e.target.value })}
                required
                placeholder="nǐ hǎo"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Chữ Hán *</label>
              <input
                type="text"
                value={formData.chinese}
                onChange={(e) => setFormData({ ...formData, chinese: e.target.value })}
                required
                placeholder="你好"
              />
            </div>
            <div className="form-group">
              <label>Category *</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                placeholder="Chào hỏi"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Độ khó *</label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
            >
              <option value="easy">Dễ</option>
              <option value="medium">Trung bình</option>
              <option value="hard">Khó</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit">
              {editingId ? '💾 Cập nhật' : '➕ Thêm mới'}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="btn-cancel">
                ❌ Hủy
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="admin-table-card">
        <h2>📚 Danh sách câu ({phrases.length})</h2>
        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tiếng Việt</th>
                  <th>Pinyin</th>
                  <th>Chữ Hán</th>
                  <th>Category</th>
                  <th>Độ khó</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {phrases.map(phrase => (
                  <tr key={phrase.id}>
                    <td>{phrase.id}</td>
                    <td>{phrase.vietnamese}</td>
                    <td>{phrase.pinyin}</td>
                    <td className="chinese-col">{phrase.chinese}</td>
                    <td><span className="badge">{phrase.category}</span></td>
                    <td><span className={`badge badge-${phrase.difficulty}`}>{phrase.difficulty}</span></td>
                    <td>
                      <button onClick={() => handleEdit(phrase)} className="btn-edit">✏️</button>
                      <button onClick={() => handleDelete(phrase.id)} className="btn-delete">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
