/* =========================================================
   旅遊資訊網站 — 互動行為
   學員編號：04 / 姓名：CheungChunKin

   全站共用同一個檔案，每項功能都會先檢查頁面上有無對應元素，
   找不到就直接跳過，所以任何一頁都不會出現 JavaScript 錯誤。
   引入方式：<script src="js/script.js" defer></script>
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     共用小工具
     --------------------------------------------------------- */

  // 使用者若在系統設定選擇「減少動畫」，捲動就不用平滑效果
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /**
   * 切換元素的 hidden 狀態（元素不存在時安全略過）
   * @param {Element|null} element 目標元素
   * @param {boolean} shouldHide true 代表隱藏
   */
  function setHidden(element, shouldHide) {
    if (!element) return;
    element.hidden = shouldHide;
  }

  /* ---------------------------------------------------------
     1. 手機版漢堡菜單
     平板（768px）以上由 CSS 直接顯示橫向導覽列，JS 只負責手機開合
     --------------------------------------------------------- */
  function initNavToggle() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("primary-nav");
    if (!toggle || !nav) return;

    function setOpen(isOpen) {
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      nav.classList.toggle("is-open", isOpen);
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    // 視窗放大到平板寬度時自動收起，避免留下「已展開」的殘留狀態
    const wideScreen = window.matchMedia("(min-width: 768px)");
    wideScreen.addEventListener("change", function (event) {
      if (event.matches) setOpen(false);
    });
  }

  /* ---------------------------------------------------------
     2. 目的地篩選與排序
     資料來源是 HTML 內的卡片，卡片與對比表的表格列用
     data-destination 對應，兩邊會同步篩選及同步排序
     --------------------------------------------------------- */
  function initDestinationFilter() {
    const grid = document.querySelector("[data-destination-grid]");
    if (!grid) return; // 不是目的地總覽頁

    const countrySelect = document.getElementById("filter-country");
    const seasonSelect = document.getElementById("filter-season");
    const sortSelect = document.getElementById("sort-by");
    if (!countrySelect || !seasonSelect || !sortSelect) return;

    const status = document.getElementById("filter-status");
    const emptyState = document.getElementById("empty-state");
    const table = document.querySelector("[data-comparison-table]");
    const tbody = table ? table.tBodies[0] : null;
    const tableWrap = table ? table.closest(".table-wrap") : null;

    // 英文排序用，避免中文筆劃排序結果難以預期
    const collator = new Intl.Collator("en");

    // 由卡片建立資料紀錄，index 用來還原「預設排序」
    const records = Array.prototype.map.call(
      grid.querySelectorAll("[data-destination]"),
      function (card, index) {
        const id = card.dataset.destination;
        return {
          id: id,
          card: card,
          row: tbody
            ? tbody.querySelector('[data-destination="' + id + '"]')
            : null,
          country: card.dataset.country,
          countryEn: card.dataset.countryEn,
          season: card.dataset.season,
          seasonOrder: Number(card.dataset.seasonOrder),
          nameEn: card.dataset.nameEn,
          index: index,
          visible: true
        };
      }
    );

    const total = records.length;

    // 比較函式：回傳負數代表 a 排在 b 前面
    function compare(a, b) {
      const mode = sortSelect.value;

      if (mode === "name") {
        return collator.compare(a.nameEn, b.nameEn);
      }
      if (mode === "country") {
        return (
          collator.compare(a.countryEn, b.countryEn) ||
          collator.compare(a.nameEn, b.nameEn)
        );
      }
      if (mode === "season") {
        return a.seasonOrder - b.seasonOrder ||
          collator.compare(a.nameEn, b.nameEn);
      }
      return a.index - b.index; // 預設排序：沿用 HTML 原本的次序
    }

    // 更新「顯示 X / 4 個地點」
    function updateStatus(shown) {
      if (!status) return;
      status.textContent = "";
      status.append("顯示 ");
      const count = document.createElement("strong");
      count.textContent = String(shown);
      status.append(count, " / " + total + " 個地點");
    }

    function apply() {
      const country = countrySelect.value;
      const season = seasonSelect.value;

      records.forEach(function (record) {
        record.visible =
          (country === "all" || record.country === country) &&
          (season === "all" || record.season === season);
      });

      // 先隱藏不符合條件的卡片與表格列
      records.forEach(function (record) {
        record.card.classList.toggle("is-filtered-out", !record.visible);
        if (record.row) {
          record.row.classList.toggle("is-filtered-out", !record.visible);
        }
      });

      // 再依所選方式重新排列（隱藏的項目一併排到後面，還原時次序才正確）
      records
        .slice()
        .sort(compare)
        .forEach(function (record) {
          grid.appendChild(record.card);
          if (tbody && record.row) tbody.appendChild(record.row);
        });

      const shown = records.filter(function (record) {
        return record.visible;
      }).length;

      updateStatus(shown);
      setHidden(emptyState, shown !== 0);
      // 一個地點都沒有時，只剩表頭的對比表沒有意義，一併收起
      setHidden(tableWrap, shown === 0);
    }

    [countrySelect, seasonSelect, sortSelect].forEach(function (control) {
      control.addEventListener("change", apply);
    });

    apply(); // 載入時先套用一次，確保畫面與計數一致
  }

  /* ---------------------------------------------------------
     3. 圖片 Lightbox
     支援：點圖開啟、關閉鍵、點背景、Esc 鍵，關閉後焦點回到原圖
     --------------------------------------------------------- */
  function initLightbox() {
    const lightbox = document.getElementById("lightbox");
    const image = document.getElementById("lightbox-img");
    const caption = document.getElementById("lightbox-caption");
    const closeButton = document.getElementById("lightbox-close");
    const triggers = document.querySelectorAll(".lightbox-trigger");
    if (!lightbox || !image || !closeButton || triggers.length === 0) return;

    let lastFocused = null;

    function openLightbox(trigger) {
      const thumbnail = trigger.querySelector("img");
      const text =
        trigger.dataset.lightboxCaption || (thumbnail ? thumbnail.alt : "");

      image.src = trigger.dataset.lightboxSrc || (thumbnail ? thumbnail.getAttribute("src") : "");
      image.alt = text;
      if (caption) caption.textContent = text;

      lastFocused = trigger;
      setHidden(lightbox, false);
      document.body.classList.add("is-lightbox-open");
      closeButton.focus();
    }

    function closeLightbox() {
      setHidden(lightbox, true);
      document.body.classList.remove("is-lightbox-open");
      // 把鍵盤焦點還給剛才點擊的圖片，方便繼續用鍵盤操作
      if (lastFocused) lastFocused.focus();
    }

    triggers.forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        openLightbox(trigger);
      });
    });

    closeButton.addEventListener("click", closeLightbox);

    // 點擊相片以外的背景位置也可以關閉
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !lightbox.hidden) closeLightbox();
    });
  }

  /* ---------------------------------------------------------
     4. 聯絡表單驗證
     本站沒有後端，提交只做前端驗證與提示，不會真正寄出
     --------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return; // 不是「關於本站」頁

    const status = document.getElementById("form-status");

    // 每個欄位：輸入框、錯誤訊息位置、驗證函式（回傳空字串代表通過）
    const fields = [
      {
        input: document.getElementById("contact-name"),
        error: document.getElementById("contact-name-error"),
        validate: function (value) {
          if (value.trim() === "") return "請填寫姓名。";
          if (value.trim().length < 2) return "姓名至少要有 2 個字元。";
          return "";
        }
      },
      {
        input: document.getElementById("contact-email"),
        error: document.getElementById("contact-email-error"),
        validate: function (value) {
          if (value.trim() === "") return "請填寫電郵地址。";
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) {
            return "電郵格式不正確，請重新檢查。";
          }
          return "";
        }
      },
      {
        input: document.getElementById("contact-message"),
        error: document.getElementById("contact-message-error"),
        validate: function (value) {
          if (value.trim() === "") return "請填寫訊息內容。";
          if (value.trim().length < 10) return "訊息至少要有 10 個字元。";
          return "";
        }
      }
    ].filter(function (field) {
      return Boolean(field.input);
    });

    if (fields.length === 0) return;

    function showError(field, message) {
      const isInvalid = message !== "";
      field.input.classList.toggle("is-invalid", isInvalid);
      field.input.setAttribute("aria-invalid", isInvalid ? "true" : "false");
      if (field.error) {
        field.error.textContent = message;
        setHidden(field.error, !isInvalid);
      }
    }

    function validateField(field) {
      const message = field.validate(field.input.value);
      showError(field, message);
      return message === "";
    }

    fields.forEach(function (field) {
      // 離開欄位時才提示，避免使用者一開始打字就被罵
      field.input.addEventListener("blur", function () {
        validateField(field);
      });

      // 使用者開始修正時，先收起該欄的錯誤訊息
      field.input.addEventListener("input", function () {
        if (field.input.classList.contains("is-invalid")) showError(field, "");
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault(); // 沒有後端，不進行真正的傳送

      const invalidFields = fields.filter(function (field) {
        return !validateField(field);
      });

      if (invalidFields.length > 0) {
        if (status) {
          status.textContent =
            "請先修正以上 " + invalidFields.length + " 個欄位。";
          status.classList.add("is-error");
          setHidden(status, false);
        }
        invalidFields[0].input.focus();
        return;
      }

      form.reset();
      fields.forEach(function (field) {
        showError(field, "");
      });

      if (status) {
        status.textContent =
          "多謝你的訊息！本站是課堂習作，表單只作示範，不會真正寄出。";
        status.classList.remove("is-error");
        setHidden(status, false);
      }
    });
  }

  /* ---------------------------------------------------------
     5. 返回頂部按鈕（全站每一頁都有）
     捲動超過 300px 才出現，避免一開始就擋住內容
     --------------------------------------------------------- */
  function initBackToTop() {
    const button = document.getElementById("back-to-top");
    if (!button) return;

    const THRESHOLD = 300;

    function syncVisibility() {
      setHidden(button, window.scrollY <= THRESHOLD);
    }

    button.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth"
      });
    });

    window.addEventListener("scroll", syncVisibility, { passive: true });
    syncVisibility(); // 重新整理後可能停在中間，載入時先同步一次
  }

  /* ---------------------------------------------------------
     啟動
     --------------------------------------------------------- */
  function init() {
    initNavToggle();
    initDestinationFilter();
    initLightbox();
    initContactForm();
    initBackToTop();
  }

  // 已經用 defer 引入，DOM 通常已就緒；這裡再保險一次
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
