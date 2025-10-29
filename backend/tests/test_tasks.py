from unittest.mock import Mock

# Тестируем только бизнес-логику, без HTTP слоя


def test_create_task_success(mocker):
    """Тест успешного создания задачи"""
    # Импортируем внутри функции чтобы избежать проблем с путями
    from crud.tasks import create_task
    from schemas.task import TaskCreate
    from models.task import Task, TaskStatus

    # Мокаем сессию базы данных
    mock_db = Mock()
    mock_task = Task(
        id=1,
        title="Test Task",
        description="Test Description",
        status=TaskStatus.PENDING
    )

    # Мокаем добавление в базу и возврат объекта
    mock_db.add = Mock()
    mock_db.commit = Mock()
    mock_db.refresh = Mock(side_effect=lambda x: setattr(x, 'id', 1))

    # Создаем тестовые данные
    task_data = TaskCreate(
        title="Test Task",
        description="Test Description",
        status=TaskStatus.PENDING
    )

    # Мокаем создание объекта Task
    mocker.patch('crud.tasks.Task', return_value=mock_task)

    # Вызываем тестируемую функцию
    result = create_task(mock_db, task_data)

    # Проверяем что методы были вызваны
    mock_db.add.assert_called_once()
    mock_db.commit.assert_called_once()
    mock_db.refresh.assert_called_once_with(mock_task)

    # Проверяем результат
    assert result.id == 1
    assert result.title == "Test Task"


def test_get_task_success():
    """Тест успешного получения задачи"""
    from crud.tasks import get_task
    from models.task import Task, TaskStatus

    # Мокаем сессию базы данных
    mock_db = Mock()
    mock_task = Task(
        id=1,
        title="Test Task",
        status=TaskStatus.PENDING
    )

    # Мокаем запрос к базе
    mock_query = Mock()
    mock_filter = Mock()

    mock_db.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = mock_task

    # Вызываем тестируемую функцию
    result = get_task(mock_db, 1)

    # Проверяем что запрос был выполнен правильно
    mock_db.query.assert_called_once_with(Task)
    mock_query.filter.assert_called_once()
    mock_filter.first.assert_called_once()

    # Проверяем результат
    assert result == mock_task
    assert result.id == 1
    assert result.title == "Test Task"


def test_get_task_not_found():
    """Тест получения несуществующей задачи"""
    from crud.tasks import get_task

    # Мокаем сессию базы данных (возвращаем None)
    mock_db = Mock()
    mock_query = Mock()
    mock_filter = Mock()

    mock_db.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = None  # задача не найдена

    # Вызываем тестируемую функцию
    result = get_task(mock_db, 999)

    # Проверяем что вернулся None
    assert result is None


def test_delete_task_success():
    """Тест успешного удаления задачи"""
    from crud.tasks import delete_task
    from models.task import Task

    # Мокаем сессию базы данных
    mock_db = Mock()
    mock_task = Task(id=1, title="Task to delete")

    # Мокаем поиск и удаление
    mock_query = Mock()
    mock_filter = Mock()
    mock_first = Mock(return_value=mock_task)

    mock_db.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = mock_task
    mock_db.delete = Mock()
    mock_db.commit = Mock()

    # Вызываем тестируемую функцию
    result = delete_task(mock_db, 1)

    # Проверяем что методы были вызваны
    mock_db.delete.assert_called_once_with(mock_task)
    mock_db.commit.assert_called_once()

    # Проверяем результат
    assert result is True


def test_delete_task_not_found():
    """Тест удаления несуществующей задачи"""
    from crud.tasks import delete_task

    # Мокаем сессию базы данных (задача не найдена)
    mock_db = Mock()
    mock_query = Mock()
    mock_filter = Mock()

    mock_db.query.return_value = mock_query
    mock_query.filter.return_value = mock_filter
    mock_filter.first.return_value = None

    # Вызываем тестируемую функцию
    result = delete_task(mock_db, 999)

    # Проверяем что вернулось False
    assert result is False
    # Проверяем что delete не вызывался
    mock_db.delete.assert_not_called()
