console.log('JS Работает')

  // Обрабатываем отправку формы
  document.getElementById("commentForm").addEventListener("submit", saveComment);

  function saveComment(event) {
    event.preventDefault();

    // Получаем текст комментария из поля
    const commentInput = document.getElementById("commentInput");
    const commentText = commentInput.value;

    // Получаем текущие Гео
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      alert("Геолокация не поддерживается в вашем браузере");
    }

    function successCallback(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Создаем объект с комментарием и Гео
      const commentData = {
        comment: commentText,
        latitude: latitude,
        longitude: longitude
      };

      // Получаем комментарии из LocalStorage
      let comments = JSON.parse(localStorage.getItem("comments")) || [];

      // Добавляем новый комментарий в список
      comments.push(commentData);

      // Сохраняем обновленный список комментариев в LocalStorage
      localStorage.setItem("comments", JSON.stringify(comments));

      // Очищаем текстовое поле для ввода комментария
      commentInput.value = "";

      // Обновляем список комментариев на странице
      displayComments();
    }

    function errorCallback(error) {
      console.log("Ошибка при определении местоположения:", error.message);
    }
  }

  // Функция для отображения списка комментариев на странице
  function displayComments() {
    const commentsList = document.getElementById("commentsList");

    // Очищаем список комментариев перед обновлением
    commentsList.innerHTML = "";

    // Получаем список комментариев из LocalStorage
    let comments = JSON.parse(localStorage.getItem("comments")) || [];

    // Добавляем каждый комментарий в список
    comments.forEach(function(commentData) {
      const listItem = document.createElement("li");
      listItem.textContent = `${commentData.comment} (Широта: ${commentData.latitude}, Долгота: ${commentData.longitude})`;
      commentsList.appendChild(listItem);
    });
  }

  // Вызываем функцию для отображения списка комментариев при загрузке страницы
  displayComments();