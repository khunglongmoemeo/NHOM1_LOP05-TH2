import React, { useState } from "react";

const QuanLyCauHoi = () => {
  const [questions, setQuestions] = useState([]);
  const [form, setForm] = useState({
    id: "",
    subject: "",
    content: "",
    level: "Dễ",
    category: "",
  });

  const [search, setSearch] = useState("");

  const handleAdd = () => {
    if (!form.id || !form.subject || !form.content) {
      alert("Nhập đầy đủ thông tin!");
      return;
    }

    setQuestions([...questions, form]);
    setForm({
      id: "",
      subject: "",
      content: "",
      level: "Dễ",
      category: "",
    });
  };

  const filtered = questions.filter(
    (q) =>
      q.subject.toLowerCase().includes(search.toLowerCase()) ||
      q.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Quản lý câu hỏi</h2>

      {/* Thanh tìm kiếm + thêm */}
      <div style={styles.topBar}>
        <input
          style={styles.searchInput}
          placeholder="Tìm theo môn học hoặc khối..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button style={styles.addBtn} onClick={handleAdd}>
          + Thêm
        </button>
      </div>

      {/* Form thêm */}
      <div style={styles.formBox}>
        <input
          placeholder="Mã câu hỏi"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
        />
        <input
          placeholder="Môn học"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />
        <input
          placeholder="Khối kiến thức"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />
        <select
          value={form.level}
          onChange={(e) => setForm({ ...form, level: e.target.value })}
        >
          <option>Dễ</option>
          <option>Trung bình</option>
          <option>Khó</option>
          <option>Rất khó</option>
        </select>
        <input
          placeholder="Nội dung câu hỏi"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
      </div>

      {/* Bảng */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Môn học</th>
            <th>Nội dung</th>
            <th>Mức độ</th>
            <th>Khối</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((q, index) => (
            <tr key={index}>
              <td>{q.id}</td>
              <td>{q.subject}</td>
              <td>{q.content}</td>
              <td>{q.level}</td>
              <td>{q.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "30px",
    background: "#f5f5f5",
    minHeight: "100vh",
  },
  title: {
    marginBottom: "20px",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
  },
  searchInput: {
    padding: "8px",
    width: "300px",
  },
  addBtn: {
    background: "#d60000",
    color: "white",
    border: "none",
    padding: "8px 16px",
    cursor: "pointer",
  },
  formBox: {
    background: "white",
    padding: "15px",
    marginBottom: "20px",
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "10px",
  },
  table: {
    width: "100%",
    background: "white",
    borderCollapse: "collapse",
  },
};

export default QuanLyCauHoi;