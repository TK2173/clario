const lessons = {
  internet: {
    title: "Как работает интернет",
    subtitle: "Как информация попадает с одного устройства на другое.",
    nodes: [
      { title: "Твоё устройство", short: "Ты отправляешь запрос", simple: "Телефон формирует запрос — например, когда ты открываешь сайт.", detail: "Браузер создаёт сетевой запрос с адресом нужного ресурса и отправляет его через подключение к сети.", deep: "Обычно браузер сначала получает IP-адрес домена через DNS, затем устанавливает соединение и отправляет HTTP-запрос." },
      { title: "Маршрут данных", short: "Данные идут по сети", simple: "Сетевое оборудование передаёт данные дальше к нужному адресу.", detail: "Данные делятся на пакеты. Маршрутизаторы пересылают их по сетям, пока они не достигнут нужного сервера.", deep: "Маршрут зависит от сетевой топологии и таблиц маршрутизации. Пакеты могут идти разными путями." },
      { title: "Сервер", short: "Находит нужную информацию", simple: "Сервер получает запрос и готовит ответ — например, страницу сайта.", detail: "Серверное приложение обрабатывает запрос, при необходимости обращается к базе данных и возвращает результат.", deep: "Сервер может проверять права доступа, выполнять бизнес-логику, читать кеш или базу данных и формировать HTTP-ответ." },
      { title: "Ответ возвращается", short: "Ты видишь результат", simple: "Ответ приходит обратно, и браузер показывает страницу.", detail: "Браузер получает HTML, стили, изображения и другие ресурсы, а затем собирает страницу на экране.", deep: "Браузер разбирает HTML и CSS, строит DOM и CSSOM, выполняет JavaScript и отображает итоговую страницу." }
    ]
  },
  electricity: {
    title: "Как работает электричество",
    subtitle: "Как энергия проходит через простую электрическую цепь.",
    nodes: [
      { title: "Источник энергии", short: "Батарея создаёт напряжение", simple: "Батарея создаёт разность электрических потенциалов — напряжение.", detail: "Напряжение создаёт условия для направленного движения зарядов в проводнике.", deep: "Электрическое поле в цепи устанавливается очень быстро после замыкания; дрейфовая скорость электронов при этом сравнительно мала." },
      { title: "Замкнутая цепь", short: "Есть путь для тока", simple: "Для устойчивого тока нужен замкнутый проводящий путь.", detail: "Проводники соединяют источник и потребитель. Если цепь разомкнута, обычный ток через неё не проходит.", deep: "В простой цепи ток определяется напряжением источника и полным сопротивлением нагрузки и проводников." },
      { title: "Лампочка", short: "Энергия превращается в свет", simple: "Лампочка преобразует электрическую энергию в свет и тепло.", detail: "В зависимости от типа лампы свет возникает за счёт нагрева нити или процессов в полупроводниках.", deep: "Мощность, рассеиваемая нагрузкой, определяется соотношением P = U × I; для резистивной нагрузки также P = I²R." },
      { title: "Обратный путь", short: "Цепь замыкается", simple: "Ток проходит по цепи, образуя замкнутый путь к источнику.", detail: "Если провод оборвать или выключатель разомкнуть, цепь перестанет проводить устойчивый ток.", deep: "В последовательной цепи ток одинаков во всех элементах; в разветвлённой цепи ток распределяется между ветвями." }
    ]
  },
  geometry: {
    title: "Теорема Пифагора",
    subtitle: "Находим сторону прямоугольного треугольника шаг за шагом.",
    nodes: [
      { title: "Катеты a и b", short: "Стороны у прямого угла", simple: "Катеты образуют прямой угол. Возьмём длины 3 и 4.", detail: "В прямоугольном треугольнике катеты — стороны, которые образуют угол 90°.", deep: "Теорема Пифагора применима только к прямоугольным треугольникам в евклидовой геометрии." },
      { title: "Возводим в квадрат", short: "a² + b²", simple: "3² = 9, а 4² = 16.", detail: "Умножаем длину каждой стороны саму на себя: 3 × 3 и 4 × 4.", deep: "Квадраты длин катетов складываются: a² + b² = c², где c — гипотенуза." },
      { title: "Складываем", short: "9 + 16 = 25", simple: "Складываем результаты и получаем 25.", detail: "По теореме сумма квадратов катетов равна квадрату гипотенузы.", deep: "Для выбранных значений c² = 3² + 4² = 9 + 16 = 25." },
      { title: "Находим гипотенузу", short: "√25 = 5", simple: "Квадратный корень из 25 равен 5. Ответ: 5.", detail: "Гипотенуза равна квадратному корню из суммы квадратов катетов.", deep: "c = √(a² + b²) = √25 = 5. Треугольник со сторонами 3, 4 и 5 — целочисленная пифагорова тройка." }
    ]
  }
};
let currentLesson = null, currentStep = 0, currentLevel = "simple";
const $ = (s) => document.querySelector(s);
const lessonSection = $("#lesson");
const levelNames = {simple:"Коротко и понятным языком.",detail:"Больше подробностей и связей.",deep:"Более техническое объяснение."};
function renderLesson(id, customTitle) {
  currentLesson = lessons[id] || makeCustomLesson(customTitle || "Новая тема");
  currentStep = 0; currentLevel = "simple";
  $("#lesson-title").textContent = currentLesson.title;
  $("#lesson-subtitle").textContent = currentLesson.subtitle;
  lessonSection.classList.remove("hidden");
  document.querySelectorAll(".level-button").forEach(b=>b.classList.toggle("active",b.dataset.level===currentLevel));
  renderDiagram(); renderStep();
  lessonSection.scrollIntoView({behavior:"smooth",block:"start"});
}
function makeCustomLesson(title) {
  return {title, subtitle:"Это базовая схема для самостоятельного разбора темы. Материалы можно расширять вручную.", nodes:[
    {title:"Главная идея",short:"О чём эта тема",simple:`Сначала определим, что означает «${title}».`,detail:`Разбей тему «${title}» на ключевые понятия и выясни, как они связаны.`,deep:"Для глубокого понимания уточни определения, условия и исключения."},
    {title:"Основные элементы",short:"Из чего состоит",simple:"Выдели несколько главных частей темы.",detail:"Каждый элемент выполняет свою роль и связан с остальными.",deep:"Сравни элементы, их свойства, зависимости и ограничения."},
    {title:"Как это работает",short:"Связи и последовательность",simple:"Посмотри, что происходит сначала и что — потом.",detail:"Проследи причинно-следственные связи между элементами.",deep:"Проверь модель на примерах и исключительных случаях."},
    {title:"Пример",short:"Применяем на практике",simple:"Найди простой пример из жизни.",detail:"Примени основные понятия к конкретной ситуации.",deep:"Попробуй самостоятельно объяснить результат и обосновать каждый шаг."}
  ]};
}
function renderDiagram() {
  const diagram=$("#diagram"); diagram.replaceChildren();
  currentLesson.nodes.forEach((node,i)=>{
    const btn=document.createElement("button"); btn.type="button"; btn.className="diagram-node"+(i===currentStep?" selected":"");
    btn.setAttribute("aria-pressed",String(i===currentStep));
    btn.innerHTML=`<span class="node-number">${String(i+1).padStart(2,"0")}</span><span class="node-copy"><strong></strong><small></small></span><span class="node-arrow">↗</span>`;
    btn.querySelector("strong").textContent=node.title; btn.querySelector("small").textContent=node.short;
    btn.addEventListener("click",()=>{currentStep=i;renderDiagram();renderStep()});
    diagram.append(btn);
    if(i<currentLesson.nodes.length-1){const arrow=document.createElement("div");arrow.className="node-arrow";arrow.textContent="↓";arrow.setAttribute("aria-hidden","true");diagram.append(arrow)}
  });
}
function renderStep(){
  const n=currentLesson.nodes[currentStep];
  $("#step-count").textContent=`${String(currentStep+1).padStart(2,"0")} / ${String(currentLesson.nodes.length).padStart(2,"0")}`;
  $("#step-number").textContent=`ШАГ ${String(currentStep+1).padStart(2,"0")}`;
  $("#step-title").textContent=n.title; $("#step-description").textContent=n[currentLevel];
  $("#level-note").textContent=levelNames[currentLevel];
  $("#next-step").innerHTML=currentStep===currentLesson.nodes.length-1?'Начать сначала <span>↻</span>':'Следующий шаг <span>→</span>';
}
document.querySelectorAll("[data-topic]").forEach(b=>b.addEventListener("click",()=>renderLesson(b.dataset.topic)));
document.querySelectorAll(".level-button").forEach(b=>b.addEventListener("click",()=>{currentLevel=b.dataset.level;document.querySelectorAll(".level-button").forEach(x=>x.classList.toggle("active",x===b));renderStep()}));
$("#next-step").addEventListener("click",()=>{currentStep=(currentStep+1)%currentLesson.nodes.length;renderDiagram();renderStep()});
$("#close-lesson").addEventListener("click",()=>{lessonSection.classList.add("hidden");$("#topic-input").focus()});
$("#topic-form").addEventListener("submit",e=>{e.preventDefault();const value=$("#topic-input").value.trim();if(!value){$("#topic-input").focus();return}const known=Object.entries(lessons).find(([id,l])=>l.title.toLowerCase()===value.toLowerCase());renderLesson(known?known[0]:"custom",value)});
$("#year").textContent=new Date().getFullYear();
