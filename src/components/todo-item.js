import { useState } from "react";
import axios from "axios";
const Todo = ({ item, updateHandler, editingIndex, cancelHandler, setList, handleDeleteClick}) => {
    const isEditing = editingIndex === item.id;
    const [editedTodo, setEditedTodo] = useState(item.todo);

  const handleInputChange = (e) => {
    setEditedTodo(e.target.value);
  };
  const handleSaveClick = async () => {
    if (editedTodo.trim() === "") {
      // 수정된 내용이 비어있을 경우, 저장하지 않고 종료
      updateHandler(item);
      return;
    }

    try {
      // 수정된 값을 서버에 전송하여 객체를 수정
      const accessToken = window.localStorage.getItem('jwt');
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      };
      const updatedItem = { ...item, todo: editedTodo };
      await axios.put(`http://localhost:8000/todos/${item.id}`, updatedItem, {headers});
      const response = await axios.get('http://localhost:8000/todos', { headers });
      setList(response.data);
      // 저장 후에는 편집 모드 종료
      updateHandler(item);
    } catch (error) {
      console.error('변경 사항 저장 실패:', error);
    }
  };
    return (
      <li>
         <label>
          <input type="checkbox" />
          {isEditing ? (
            <input data-testid="modify-input" 
                   value={editedTodo}
                   onChange={handleInputChange} 
            />
          ) : (
            <span>{item.todo}</span>
          )}
         </label>
         <button data-testid="modify-button" onClick={isEditing ? handleSaveClick : () => updateHandler(item)}>
           {isEditing ? "제출" : "수정"}
         </button>
        {isEditing ? <button data-testid="cancel-button" onClick={()=>{cancelHandler(item)}}>취소</button>:<button data-testid="delete-button" onClick={()=>{handleDeleteClick(item)}}>삭제</button>}
      </li>
    );
  };
  
  export default Todo;
  