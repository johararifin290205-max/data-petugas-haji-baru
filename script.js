
/* ==========================================
   DATA PETUGAS HAJI
   GITHUB PAGES
   DOWNLOAD DOKUMEN PDF
========================================== */

(() => {

    "use strict";

    /* ======================================
       1. ELEMEN HTML
    ====================================== */

    const list = document.getElementById("list");
    const search = document.getElementById("search");
    const count = document.getElementById("count");
    const empty = document.getElementById("empty");
    const error = document.getElementById("error");


    /* ======================================
       2. VALIDASI ELEMEN
    ====================================== */

    if (!list || !search || !count || !empty || !error) {
        console.error("Elemen HTML tidak ditemukan.");
        return;
    }


    /* ======================================
       3. DATA DOKUMEN
    ====================================== */

    let documents = [];


    /* ======================================
       4. MEMBUAT DAFTAR DOKUMEN
    ====================================== */

    function renderDocuments() {

        const keyword = search.value
            .trim()
            .toLocaleLowerCase("id");

        const filteredDocuments = documents.filter(item =>
            item.judul
                .toLocaleLowerCase("id")
                .includes(keyword)
        );

        list.replaceChildren();

        count.textContent =
            `${filteredDocuments.length} dokumen tersedia`;

        empty.hidden = filteredDocuments.length > 0;


        filteredDocuments.forEach(item => {

            /* Membuat link dokumen */

            const link = document.createElement("a");

            link.className = "item";

            /*
             * Menggunakan lokasi PDF dari daftar.json.
             * Tidak lagi menggunakan folder ./pdf/
             */

            link.href = item.file;

            /*
             * Nama file ketika diunduh.
             */

            link.setAttribute(
                "download",
                item.namaUnduhan || "dokumen.pdf"
            );


            /* Tampilan kartu dokumen */

            link.innerHTML = `
                <span class="pdf">PDF</span>

                <span class="copy">
                    <strong></strong>

                    <small>Dokumen PDF</small>

                    <span class="download">
                        Unduh dokumen ↓
                    </span>
                </span>

                <span class="arrow" aria-hidden="true">
                    ›
                </span>
            `;


            /* Memasukkan judul dokumen */

            link.querySelector("strong").textContent =
                item.judul;


            /* Memasukkan kartu ke daftar */

            list.appendChild(link);

        });

    }


    /* ======================================
       5. FITUR PENCARIAN
    ====================================== */

    search.addEventListener("input", () => {

        renderDocuments();

    });


    /* ======================================
       6. MEMUAT DAFTAR.JSON
    ====================================== */

    async function loadDocuments() {

        try {

            error.hidden = true;

            count.textContent =
                "Memuat daftar dokumen...";


            const response = await fetch("./daftar.json", {
                cache: "no-store"
            });


            if (!response.ok) {

                throw new Error(
                    `Gagal memuat daftar.json: HTTP ${response.status}`
                );

            }


            const data = await response.json();


            if (!Array.isArray(data)) {

                throw new Error(
                    "Format daftar.json harus berupa array."
                );

            }


            /* Validasi setiap dokumen */

            documents = data.filter(item => {

                return (
                    item &&
                    typeof item.judul === "string" &&
                    typeof item.file === "string" &&
                    item.judul.trim() !== "" &&
                    item.file.trim() !== ""
                );

            });


            /* Tampilkan dokumen */

            renderDocuments();


            console.log(
                `Berhasil memuat ${documents.length} dokumen.`
            );


        } catch (err) {

            console.error("Load Documents Error:", err);

            list.replaceChildren();

            count.textContent =
                "Daftar dokumen gagal dimuat";

            empty.hidden = true;

            error.hidden = false;

            error.textContent =
                "Terjadi kesalahan saat memuat dokumen. " +
                err.message;

        }

    }


    /* ======================================
       7. INISIALISASI WEBSITE
    ====================================== */

    async function initializeWebsite() {

        await loadDocuments();

    }


    /* Jalankan website */

    initializeWebsite();

})();
