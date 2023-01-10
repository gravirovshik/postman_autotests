// Добавление переменной в коллекцию

let jsonData1 = JSON.parse(responseBody);
pm.collectionVariables.set("customer_id", jsonData1.person);

// Проверка кода ответа
pm.test("Ожидаю статус ответа 200", () => {
    pm.response.to.have.status(200);
})

// Тоже проверка кода, но другим способом
pm.test("Ожидаю статус ответа 200", () => {
    pm.expect(pm.response.code).to.eql(200);
});

// Проверка, что код ответа 201 или 202
pm.test("Успешный код ответа 201 или 202", () => {
    pm.expect(pm.response.code).to.be.oneOf([201, 202]);
});

// Проверка статуса ответа
pm.test("В статусе есть текст ОК", () => {
    pm.response.to.have.status("OK");
});

// Проверка времени ответа
pm.test("Время ответа меньше 200 мс", () => {
    pm.expect(pm.response.responseTime).to.be.below(200);
});

// Проверка на наличие хэдера
pm.test("Присутствует хэдер Content-Type", () => {
    pm.response.to.have.header("Content-Type");
});

// Проверка, что хэдер Content-Type имеет значение application/json
pm.test("Хэдер Content-Type имеет значение application/json", () => {
    pm.expect(pm.response.headers.get('Content-Type')).to.eql('application/json');
});

// Содержит ли тело ответа строку "customer_id"
pm.test("Body contains string", () => {
    pm.expect(pm.response.text()).to.include("customer_id");
});

// Присутствует ли в ответе кука Session_id
pm.test("Кука Session_id есть в ответе", () => {
    pm.expect(pm.cookies.has('Session_id')).to.be.true;
});

// Значение куки Session_id равно 1658404215
pm.test("Значение куки Session_id равно 1658404215", () => {
    pm.expect(pm.cookies.get('Session_id')).to.eql('1658404215');
});

// Проверка типов значений
const jsonData = pm.response.json();
pm.test("Проверка типов значений ответа", () => {
    pm.expect(jsonData).to.be.an("object");
    pm.expect(jsonData.name).to.be.a("string");
    pm.expect(jsonData.id).to.be.a("number");
    pm.expect(jsonData.orders).to.be.an("array");
    pm.expect(jsonData.documents).to.be.undefined;
    pm.expect(jsonData.tel).to.be.null;
});

// Проверка текущего окружения
pm.test("Окружение продовое", () => {
    pm.expect(pm.environment.name).to.eql("Production");
});

// Проверка нескольких утверждений сразу
pm.test("Проверка нескольких утверждений сразу", () => {
    const responseJson = pm.response.json();
    pm.expect(responseJson.type).to.eql('customer');
    pm.expect(responseJson.name).to.be.a('string');
    pm.expect(responseJson.id).to.have.lengthOf(2);
});