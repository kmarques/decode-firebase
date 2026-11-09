import { useEffect, useState } from "react"
import { firestore } from "../lib/firebase";
import { onSnapshot, addDoc, setDoc, deleteDoc, collection, where, query, orderBy, updateDoc } from "firebase/firestore";

export default function Todos() {
    const [todos, setTodos] = useState();

    useEffect(() => {
        const unregister = onSnapshot(query(
            collection(firestore, "todos"),
            where("done", "==", false),
            orderBy('title', 'asc')
        ), (data) => {
            console.log(data);
            setTodos(data.docs);
        });
        return () => unregister();
    }, []);

    function addTodo(formEvent) {
        formEvent.preventDefault();
        const formData = new FormData(formEvent.currentTarget);

        const newItem = {
            title: formData.get('title'),
            done: !!formData.get('done')
        }

        addDoc(collection(firestore, "todos"), newItem).then(() => {
            alert("Data added");
            formEvent.reset();
        });
    }

    function updateTodo(doc, newDoneValue) {
        updateDoc(doc.ref, {
            done: !!newDoneValue
        }).then(() => alert("Doc updated"));
    }

    function deleteTodo(doc) {
        deleteDoc(doc.ref).then(() => alert("Doc deleted"));
    }

    return <div>
        <form onSubmit={addTodo}>
            <input name="title" />
            <input type="checkbox" name="done" />
            <input type="submit" value="Add" />
        </form>
        {todos === undefined && <p>Chargement ...</p>}
        {todos?.length === 0 && <p>Pas de tâches</p>}
        {todos?.length > 0 && <table>
            <tbody>
                {todos?.map(doc => {
                    const item = {
                        id: doc.id,
                        ...doc.data()
                    };

                    return <tr key={item.id} >
                        <td>
                            {item.title}
                        </td>
                        <td>
                            <input type="checkbox" checked={item.done}
                                onChange={
                                    (event) => updateTodo(doc, event.currentTarget.value)
                                } />
                        </td>
                        <td>
                            <button onClick={() => deleteTodo(doc)}>Delete</button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>}
    </div>
}