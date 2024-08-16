React.memo HOC Higher Order Component 
-Component có thể skip việc render khi props được truyền vào là giống nhau
- Chỉ render khi props của component thay đổi 

//useEffect
// 1.Cập nhật lại state
// 2.Cập nhật lại DOM
// 3.Render lại UI
// 4. Gọi cleanup nếu deps thay đổi
// 5. Gọi useEffect callback

//useLayoutEffect
// 1.Cập nhật lại state
// 2.Cập nhật DOM(mutated)
// 3.Gọi cleanup nếu deps thay đổi (sync)
// 4. Gọi useLayoutEffect callback (sync)
// 5. Render lại UI

//useRef
// Lưu các giá trị của một tham chiếu bên ngoài
// function component
 const timerID = useRef(10);
 console.log(timerID.current) // 10