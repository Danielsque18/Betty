// Зоосалон «Бетти»: видео (лёгкие версии на телефоне, играют только на экране), отзывы, фильтр работ, крупное фото,
// статус «открыто» по калужскому времени (UTC+3), меню.
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* отзывы — дословно с Яндекс Карт */
  var R = [
    ['Лариса Майбродская', 'апрель 2026', 'Брльшое спасибо всем девочкам салона\nОсобенно груммеру Наталье, потому что второй раз отдаю ей в руки своих хасок и она творит чудеса, как она там колдует , но собаки выходят сногсшибательные ( это еще в период линьки)\nПривели сегодня еще кота впервые, котик ворастной недотрога, но отдавали и забирали его очень довольным'],
    ['Ирина', 'июль 2026', 'Отличный салон , ходим только сюда ))) хорошее отношение к животным индивидуальный подход к каждому ) у меня кошечки агрессивные не любят все это во многих салонах отказываются , но не здесь!!'],
    ['Екатерина Козырь', 'март 2025', 'У нас мейн кун - дама сурового вида и непростого характера, на счету у которой несколько неудачных походов к грумеру, о чем мы честно предупредили Ксению. Через два часа из салона «Бетти» мы забирали идеально вычесанную и вымытую спокойную кошку!\n\nСпасибо огромное! ♥️🐾'],
    ['Светлана В.', 'сентябрь 2024', 'Посетили салон с нашими двумя девочками бернскими зенненхундами Бетти и Мартой. Результатом остались очень довольны и хозяева, и питомцы. Девочки наши крупные, объем работы серьезный-47 кг. и 56 кг.  Мастер работал виртуозно, играючи, со знанием всех тонкостей своей профессии. Обращение с питомцами великолепное, как с детьми. …'],
    ['Настя Т.', 'май 2025', 'Самый лучший салон ❣️ ходим уже 2 года , строго каждый месяц на процедуры. Собачка бодрая, веселая , довольная выбегает. Никогда никаких нареканий нет. Огромная благодарность Анне!'],
    ['Курганова Залина', 'август 2025', 'Замечательный салон! Всегда всё по делу и аккуратно. Евлампия даже не возражает (а у нас Мейн Кун). Ездим на протяжении года и никаких проблем, одни положительные эмоции. Спасибо за Ваш труд!'],
    ['Татьяна Варакута', 'август 2024', 'Очень крутой салон. Большой, светлый. Привозила мыть 8 шпицев, девчонки справились быстро, в обед уже забрала. Девочки приятные, с собачками обращаются бережно. Очень довольна. Спасибо. Обязательно вернемся.'],
    ['Кирилл Филипичев', 'апрель 2025', 'Прекрасный салон, ходим туда не первый год, мастер каким-то чудом справляется с неудержимым Биглем, собака всегда выходит веселой и чистой, рекомендую))'],
    ['Онега Панкратова', 'сентябрь 2025', 'Лучший салон, такая приятная атмосфера! Всегда заботливые девочки. Стригли кошек. Видели, как принимают ванну большие собаки😍 как вообще девочки относятся к животным. Просто лучшие❤️ Удачи и процветания вам.'],
    ['Кристина Наумова', 'январь 2025', 'Все отлично, ходим с собачкой ногти подстригать, нам не дается а в салоне вообще без проблем. Очень бережное отношение ни разу не запищала даже.'],
    ['Юрий Гаврилов', 'апрель 2026', 'Лучший зоосалон! Привожу сюда кошку для вычёывания. Большое спасибо девушкам, за работу! После посещения - кошка красавица! Рекомендую!'],
    ['Юлия Новикова', 'май 2025', 'Каждый раз ходим на стрижку и гигиену только в этот салон. Прекрасное отношение к животным и качественные услуги. Внимательные сотрудники, подскажут как лучше именно для Вашего животного']
  ];
  var star = '<svg><use href="#i-star"/></svg>';
  $('#revs').innerHTML = R.map(function (r) {
    return '<article class="rev"><span class="stars">' + star + star + star + star + star + '</span><p>' + esc(r[2]) + '</p><footer><span class="av">' + esc(r[0].charAt(0)) + '</span><span><b>' + esc(r[0]) + '</b><small>' + r[1] + ' · Яндекс Карты</small></span></footer></article>';
  }).join('');
  document.querySelectorAll('.rn').forEach(function (b) {
    b.addEventListener('click', function () { var t = $('#revs'); t.scrollBy({ left: (+b.dataset.d) * Math.min(400, t.clientWidth * .85), behavior: 'smooth' }); });
  });

  /* прайс: вкладки + поиск по породе */
  (function () {
    var P = window.BETTY_PRICES; if (!P) return;
    var L = { k: 'Комплекс', pm: 'Под машинку', g: 'Гигиена', ms: 'Мойка и сушка', el: 'Экспресс-линька', v: 'Вычёсывание', s: 'Декоративные', c: 'Кошки', mid: 'Средние', big: 'Крупные' };
    var SHORT = { k: 'К', pm: 'ПМ', g: 'Г', ms: 'МС', el: 'ЭЛ' };
    var tabs = $('#ptabs'), list = $('#plist'), leg = $('#plegend'), q = $('#psearch'), cur = 'small';
    var keys = Object.keys(P);
    tabs.innerHTML = keys.map(function (k) { return '<button type="button" role="tab" data-t="' + k + '">' + esc(P[k].title) + '</button>'; }).join('');
    function cell(k, v) { return '<span class="pc"><i' + (SHORT[k] ? ' class="ab"' : '') + '>' + (SHORT[k] || L[k]) + '</i><b>' + esc(v[0]) + '</b>' + (v[1] ? '<small>' + esc(v[1]) + '</small>' : '') + '</span>'; }
    function row(r, sec) { return '<div class="pr"><div class="pn">' + esc(r[0]) + (sec ? '<em>' + esc(sec) + '</em>' : '') + '</div><div class="pv">' + Object.keys(r[1]).map(function (k) { return cell(k, r[1][k]); }).join('') + '</div></div>'; }
    function draw() {
      var term = q.value.trim().toLowerCase().replace(/ё/g, 'е'), html = '';
      tabs.querySelectorAll('button').forEach(function (b) { var on = !term && b.dataset.t === cur; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); });
      if (term) {
        var t2 = /^ко[тш]/.test(term) ? 'кошки' : term;   // «кот», «кошка» → раздел «Кошки»
        keys.forEach(function (k) {
          var inTitle = P[k].title.toLowerCase().indexOf(t2) >= 0;
          P[k].rows.forEach(function (r) { if (inTitle || r[0].toLowerCase().replace(/ё/g, 'е').indexOf(term) >= 0) html += row(r, P[k].title); });
        });
        leg.innerHTML = '';
        list.innerHTML = html || '<p class="pempty">Такой породы нет в прайсе — позвоните или напишите, назовём цену.</p>';
        return;
      }
      var S = P[cur], used = {};
      S.rows.forEach(function (r) { Object.keys(r[1]).forEach(function (k) { if (SHORT[k]) used[k] = 1; }); });
      leg.innerHTML = Object.keys(used).map(function (k) { return '<span><i class="ab">' + SHORT[k] + '</i>' + L[k] + '</span>'; }).join('') +
        (cur === 'small' ? '<span>йорки: мини · стандарт · крупный (крупнее стандарта породы)</span>' : '');
      if (S.weight) html += '<div class="pweight"><b>Комплексная стрижка полностью под машинку</b><div>' + S.weight.map(function (w) { return '<span><small>' + w[0] + '</small>' + w[1] + '</span>'; }).join('') + '</div></div>';
      if (S.note) html += '<p class="pnote">' + esc(S.note) + '</p>';
      list.innerHTML = html + S.rows.map(function (r) { return row(r); }).join('');
    }
    tabs.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) { cur = b.dataset.t; q.value = ''; draw(); } });
    q.addEventListener('input', draw);
    draw();
  })();

  /* работы: фильтр собаки / кошки */
  document.querySelectorAll('.chip').forEach(function (c) {
    c.addEventListener('click', function () {
      document.querySelectorAll('.chip').forEach(function (x) { x.classList.toggle('on', x === c); x.setAttribute('aria-selected', x === c); });
      document.querySelectorAll('.g').forEach(function (g) { g.classList.toggle('out', c.dataset.f !== 'all' && g.dataset.k !== c.dataset.f); });
      if (c.dataset.f !== 'all') $('#gal').classList.add('all');
    });
  });

  /* все работы */
  $('#galMore').addEventListener('click', function () { $('#gal').classList.add('all'); });

  /* фото крупно */
  var lb = $('#lb'), lbImg = $('#lb img');
  document.querySelectorAll('.g').forEach(function (g) {
    g.addEventListener('click', function () { var im = g.querySelector('img'); lbImg.src = im.src; lbImg.alt = im.alt; lb.hidden = false; });
  });
  function closeLb() { lb.hidden = true; }
  lb.addEventListener('click', closeLb);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });

  /* открыто ли сейчас — калужское время (UTC+3), ежедневно 10:00–20:00 */
  function tick() {
    var d = new Date(Date.now() + (180 + new Date().getTimezoneOffset()) * 60000), m = d.getHours() * 60 + d.getMinutes();
    var open = m >= 600 && m < 1200;
    var t = open ? 'Сейчас открыто, до 20:00' : (m < 600 ? 'Откроемся сегодня в 10:00' : 'Откроемся завтра в 10:00');
    $('#open').textContent = t; $('#dot').classList.toggle('is-open', open);
    $('#open2').textContent = t;
  }
  tick(); setInterval(tick, 60000);

  /* видео: телефон — лёгкая версия (на первом экране вертикальная), «экономия трафика» — только картинки;
     ролик грузится и играет, только когда виден на экране */
  var phone = matchMedia('(max-width: 640px)').matches, slim = phone || matchMedia('(max-width: 1060px)').matches;
  var save = (navigator.connection && navigator.connection.saveData) || matchMedia('(prefers-reduced-data: reduce)').matches;
  var calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var vids = [].slice.call(document.querySelectorAll('video.vid'));
  vids.forEach(function (v) {
    if (v.classList.contains('hero-v') && phone && v.dataset.posterV) v.poster = v.dataset.posterV;
    v.addEventListener('playing', function () { v.classList.add('on'); });
  });
  function load(v) {
    if (v.src || save || calm) return;
    v.src = (v.classList.contains('hero-v') && phone && v.dataset.srcV) || (slim && v.dataset.srcM) || v.dataset.src;
  }
  if ('IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) { load(v); if (v.src) { var pr = v.play(); if (pr && pr.catch) pr.catch(function () {}); } }
        else if (v.src) v.pause();
      });
    }, { rootMargin: '150px 0px' });
    vids.forEach(function (v) { vio.observe(v); });
  }

  /* шапка: под плашкой демо, при прокрутке — плотная сверху */
  var demo = $('.demo-bar');
  function head() {
    var h = demo ? demo.offsetHeight : 0, y = window.scrollY;
    $('#top').style.top = Math.max(0, h - y) + 'px';
    $('#top').classList.toggle('solid', y > h + 40);
  }
  addEventListener('scroll', head, { passive: true }); addEventListener('resize', head); head();

  /* меню */
  var top = $('#top'), burger = $('.burger');
  burger.addEventListener('click', function () { var o = top.classList.toggle('open'); burger.setAttribute('aria-expanded', o); });
  top.querySelectorAll('.nav a').forEach(function (a) { a.addEventListener('click', function () { top.classList.remove('open'); burger.setAttribute('aria-expanded', false); }); });

  /* появление при прокрутке */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.rv').forEach(function (el, i) { el.style.transitionDelay = (i % 3) * 80 + 'ms'; io.observe(el); });
  } else document.querySelectorAll('.rv').forEach(function (el) { el.classList.add('in'); });
  setTimeout(function () { document.querySelectorAll('.rv').forEach(function (el) { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in'); }); }, 2000);

  /* нижняя кнопка на телефоне прячется на первом экране и у контактов */
  var fab = $('.fab'), vis = {};
  var io2 = new IntersectionObserver(function (es) { es.forEach(function (e) { vis[e.target.id] = e.isIntersecting; }); fab.classList.toggle('off', !!(vis.hero || vis.contacts)); }, { threshold: .1 });
  ['hero', 'contacts'].forEach(function (id) { io2.observe(document.getElementById(id)); });
})();
