// ===== HP Kaisar — naskah =====
// Semua isi cerita ada di file ini. Mesinnya ada di app.js.
// Gambar bisa path lokal (assets/images/...) ATAU link: link biasa (https://...) / link Google Drive (file yang dibagikan "siapa saja yang memiliki link").
const STORY = {
  passcode: '1413',
  today: '2026-10-22',
  start: '2026-10-22T19:00',
  wallLock: 'assets/images/wallpaper/wallpaper.jpg',
  wallHome: 'assets/images/wallpaper/wallpaper-h.jpg',
  // wallpaper di dalam chat (kosongin '' kalau mau polos). chatWallDim = seberapa "dipucetin" biar bubble tetep kebaca (0 - 1)
  chatWall: { imessage: 'assets/images/wallpaper/wallpaper.jpg', wa: 'assets/images/whatsapp/wallpaper.jpg' },
  chatWallDim: 0.35,
  weather: { city: 'Bandung', t: 26, s: 'Cerah Berawan', hi: 33, lo: 25 },
};

// av = foto profil, name = nama yang tampil (opsional)
// grup WhatsApp: pakai key yang sama dengan "person" di CHATS ('grup')
const PEOPLE = {
  SastraR:        { name: 'Sastra R', av: 'assets/images/imessage/s.jpg' },
  Sastra:         { av: 'assets/images/whatsapp/s-profil.jpg' },
  grup:           { av: 'assets/images/whatsapp/g-profil.jpg' },
  // Jagad:       { av: 'assets/images/whatsapp/jagad.jpg' },
  // Dika:        { av: 'assets/images/whatsapp/dika.jpg' },
  // Janitra:     { av: 'assets/images/whatsapp/janitra.jpg' },
  Ayah:           { av: 'assets/images/whatsapp/papa.jpg' },
  'Bunda Sastra': { av: 'assets/images/whatsapp/bunda-s.jpg' },
};

// Format pesan: [pengirim, teks, jam, {opsi}]
//   pengirim: 'me' (Kaisar) | 'them' (lawan chat 1:1) | nama anggota (grup)
//   ['date', 'YYYY-MM-DD'] = ganti hari.   opsi: { img: 'path/link' } = kirim foto
// app: 'imessage' (aplikasi Pesan) | 'wa' (WhatsApp)   → pindah aplikasi cukup ganti ini
const CHATS = [
  {
    id: 'sastra', app: 'wa', name: 'Sastra-ku ♡', person: 'Sastra', pinned: true,
    msgs: [
      ['date', '2026-10-18'],
      ['them', 'sayanggg', '06:57'],
      ['them', 'huhu perutku pusing', '06:57'],
      ['me', 'hei, perutnya pusing??', '06:58'],
      ['me', 'pusing gimana sayang?', '06:58'],
      ['them', 'tidak tauu', '06:58'],
      ['them', 'aku tanya google, katanya si harus di usap-usap', '06:59'],
      ['them', 'katanya loh ya', '06:59'],
      ['them', 'eh bukan kata aku, percaya sama aku', '06:59'],
      ['me', '😂😂😂😂', '06:59'],
      ['me', 'iya sayang, percaya', '06:59'],
      ['me', 'aku kesana ya, cintaa. nanti aku usap-usap', '06:59'],
      ['me', 'mau dibawain sesuatu?', '07:00'],
      ['them', 'mau kamu aja 🤩🤩', '07:00'],
      ['me', 'noted. ditunggu ya, sayangku', '07:00'],
      ['me', 'last chat di aku', '07:00'],

      ['date', '2026-10-19'],
      ['them', 'kaiii', '20:01'],
      ['them', 'weekend anterin aku nail art', '20:01'],
      ['them', 'ditempat biasa yaaa', '20:01'],
      ['me', 'boleh, udah aku tf ya sayang', '20:02'],
      ['me', 'gih booking', '20:02'],
      ['them', 'haaaa, kebanyakan', '20:02'],
      ['them', 'jadi enak loh aku', '20:02'],
      ['them', '*gaenak', '20:02'],
      ['me', 'gapapaa, buat keperluan sayang yang lain sisanya', '20:03'],

      ['date', '2026-10-20'],
      ['them', '', '07:03', { img: 'assets/images/whatsapp/send-s.jpg' }],
      ['them', 'eh kepencet', '07:04'],
      ['me', 'nduyy 😭😭😭😭', '07:04'],
      ['me', 'lucunya, sayangkuu', '07:04'],
      ['me', 'huh hah, aku sesak napas 😭😭😭', '07:04'],
      ['me', 'yang nomor damkar berapa', '07:04'],
      ['them', 'hah kok damkar', '07:05'],
      ['me', 'madamin gejolakku yang berapi-api buat nikahin kamu sekarang juga 😭', '07:05'],
      ['them', 'AIH BODOHNYA', '07:05'],

      ['date', '2026-10-21'],
      ['me', 'sayangku, wya?', '17:06'],
      ['me', 'hei, find my kenapa mati sayang?', '17:07'],
      ['them', 'aku di bendungan', '17:08'],
      ['them', 'pusing, kepala aku penuh', '17:08'],
      ['me', 'ya Tuhan...', '17:08'],
      ['me', 'tunggu disitu ya sayang, tolong jangan mikir aneh-aneh', '17:09'],
      ['me', 'aku kesana, nanti pusingnya dibagi ke aku ya', '17:09'],
      ['me', 'cerita ke aku, mau?', '17:09'],
      ['them', 'mauuu', '17:09'],
      ['them', 'hati-hati dijalan ya, sayang...', '17:10'],
      ['them', 'maaf merepotkan', '17:10'],
      ['them', 'huhu aku mau peluk kamu :((', '17:10'],
      ['me', 'engga merepotkan, sayang', '17:10'],
      ['me', 'iya nanti dipeluk yaaa', '17:10'],

      ['date', '2026-10-22'],
      ['them', 'APASIH, ITU SIAPA DEKET-DEKET ...', '07:16'],
      ['them', 'AKU JAMBAK YA ANJING', '07:16'],
      ['them', 'BENCI', '07:16'],
      ['me', 'hei, tenang', '07:16'],
      ['them', 'GABISA', '07:17'],
      ['them', 'JAUH-JAUH NGGA', '07:17'],
      ['them', 'IHHHH APASIH, SEBEL', '07:17'],
      ['me', 'iya ini aku udah ngejauh, sayang', '07:17'],
      ['me', 'sini, sayang gabung aja', '07:17'],
      ['them', 'MALESSSS', '07:18'],
      ['me', 'sini, aku pangku', '07:18'],
      ['me', 'WKWKWK pelan-pelan hei, jangan lari', '07:18'],
    ],
  },
  {
    // chat di aplikasi Pesan (iMessage) — ini yang dapet notif "sayang / kok lama / ..." dan telepon
    id: 'sastraR', app: 'imessage', name: 'Sastra R', person: 'SastraR',
    msgs: [
      ['date', '2026-10-22'],
      ['them', 'hayo, kata jagad tadi ada yang ngajak kenalan', '18:45'],
      ['me', 'plintir aja mulutnya, ngaco', '18:45'],
      ['me', 'ngga aku tanggapin, sayang', '18:46'],
      ['them', 'nyang mener?', '18:46'],
      ['me', 'mener', '18:47'],
      ['them', 'WKWKWK', '18:47'],
      ['me', 'rewel, tunggu bentar', '18:48'],
      ['them', 'ya sayang', '18:48'],
    ],
  },
  {
    // nama grup & jam = karangan, ganti bebas. Foto profil grup: PEOPLE.grup di atas
    id: 'grup', app: 'wa', name: 'Geng Studio', person: 'grup', group: true, members: 'Jagad, Dika, Janitra, Anda', unread0: 5,
    msgs: [
      ['date', '2026-10-22'],
      ['Jagad', '', '07:21', { img: 'assets/images/whatsapp/send-g.jpg' }],
      ['Jagad', 'cepet kesini, gua udah muak sama pasangan stress ini', '07:21'],
      ['Dika', 'baru gitu udah muak, belum aja ciuman depan lu', '07:22'],
      ['Janitra', 'ya gua lah yang waktu itu pura-pura merem di studio', '07:22'],
      ['Janitra', 'biar mereka ngga keganggu', '07:22'],
      ['me', 'WKWKWK', '07:23'],
      ['Jagad', 'goblok beneran ciuman', '07:23'],
      ['Jagad', 'buruan bangsat kesini', '07:24'],
      ['Jagad', 'ah anjing', '07:24'],
    ],
  },
  {
    id: 'ayah', app: 'wa', name: 'Ayah', person: 'Ayah',
    msgs: [
      ['date', '2026-10-21'],
      ['them', 'bang, katanya mau pulang', '20:12'],
      ['them', 'long weekend', '20:12'],
      ['them', 'kita sewa villla', '20:12'],
      ['me', 'ya gampang', '20:15'],
      ['me', 'nanti diatur', '20:15'],
      ['them', 'ajak sastra bang', '20:16'],
      ['them', 'si cantik', '20:16'],
      ['me', 'bro, stop it', '20:17'],
      ['me', 'cari cantikmu sendiri', '20:17'],
      ['them', '🤣🤣🤣🤣', '20:17'],
      ['them', 'yaudah nanti ayah ajak saudara kamu', '20:18'],
      ['me', '???', '20:18'],
      ['them', 'jagad', '20:18'],
      ['me', 'beneran ya aku urus kepindahan KK', '20:19'],
      ['them', '🤣🤣🤣', '20:19'],
      ['them', 'baperan ah si abang', '20:19'],
    ],
  },
  {
    id: 'bunda', app: 'wa', name: 'Bunda Sastra', person: 'Bunda Sastra',
    msgs: [
      ['date', '2026-10-20'],
      ['them', 'Nak kaisar, kabarnya baik sayang?', '19:05'],
      ['me', 'baik, bunda', '19:08'],
      ['me', 'bunda apa kabar?', '19:08'],
      ['them', 'Syukurlah, bunda baik sayang', '19:10'],
      ['them', 'Kuliah gimana, Nak? Lancar?', '19:10'],
      ['me', 'syukurlah kalau bunda baik, sehat selalu ya bunda', '19:12'],
      ['me', 'kuliah lancar kok bunda. cuma semester tua ya agak hectic aja', '19:12'],
      ['them', 'Aamiin, semangat terus ya', '19:14'],
      ['them', 'Baik-baik sama Sastra. Kalo sastra susah dibilangin, marahin aja gapapa', '19:14'],
      ['me', 'hehe iya bunda', '19:15'],
      ['me', 'sastra baik dan selalu nurut kok bunda, kalo kai omongin', '19:15'],
    ],
  },
];

// ---------- alur ----------
// 1) lockscreen: notif masuk satu-satu (di chat DRIP.chat)
const DRIP = {
  chat: 'sastraR', first: 900, gap: 2000,
  lines: ['sayang', 'kok lama', 'kangen berat loh aku', 'jelekkk'],
};
// 2) pemain balas bebas → telepon masuk
const CALL_DELAY = 2600;
// t = Sastra, k = Kaisar (ketuk layar buat lanjut)
const CALL_ACCEPT = [
  ['t', 'sayanggg'],
  ['t', 'huhu manaa'],
  ['t', 'katanya mau kesini'],
  ['t', 'dasar pembohong handal'],
  ['k', 'ini lagi dijalan, sayangkuu'],
  ['t', 'hehe, okaii mas kaisar. adek tunggu'],
  ['k', 'hah, bsntar. aku nabrak gerobak'],
  ['t', 'selalu hiperbola'],
];
// 3) kalau ditolak → chat ini masuk (jeda DRIP.gap)
const CALL_DECLINE = ['HAH KOK DI REJECT', 'APASIH, BETE YA AKU', 'UDAH NGGA SAYANG AKU LAGI'];
// 4) abis ditolak, pemain nulis bebas → Sastra bales ini, terus nelpon lagi (tombol Tolak mati, harus diangkat)
const CALL_REPLY = 'ANGKATT, AWAS REJECT LAGI';
const CALL_ACCEPT2 = CALL_ACCEPT; // isi telepon kedua (default sama; ganti kalau mau beda)

// riwayat telepon awal (opsional): { who: 'SastraR', t: '2026-10-21T17:30', out: true, missed: false }
const CALLS = [];
const FAV = ['SastraR', 'Bunda Sastra', 'Ayah', 'Jagad', 'Dika', 'Janitra'];

// Foto
const PHOTOS = [
  { img: 'assets/images/photo/photo_6255574563768963866_w.jpg', ts: '2026-10-20T13:14', place: 'Apart' },
  { img: 'assets/images/photo/1b1e72f126947994abaf75186e86e17b.jpg', ts: '2026-10-20T13:14', place: 'Apart' },
  { img: 'assets/images/photo/1d0837d05682c8bc3e689c1bdfa4f649.jpg', ts: '2026-10-19T20:55', place: 'Apart' },
  { img: 'assets/images/photo/5a2e1d68e1646b93bb96da2fd33f734c.jpg', ts: '2026-10-17T08:03', place: 'Apart' },
  { img: 'assets/images/photo/9d16bd6ec8b65c7dc950b110b56a30e5.jpg', ts: '2026-10-15T16:40', place: 'Apart' },
  { img: 'assets/images/photo/96af361308330d3424b5d9161c04c0a5.jpg', ts: '2026-10-12T22:10', place: 'Kantor' },
  { img: 'assets/images/photo/760d519ea0911af047a4b09d3196719c.jpg', ts: '2026-10-11T23:20', place: 'Apart' },
  { img: 'assets/images/photo/8086fcdbf0902bf13da842417fb1b82f.jpg', ts: '2026-10-09T02:31', place: 'Kantor' },
  { img: 'assets/images/photo/71846e937b915406891b878c9cad63f3.jpg', ts: '2026-10-03T21:47', place: 'Sungai Han' },
  { img: 'assets/images/photo/809920a589dcd5fa280be03dfd15b4db.jpg', ts: '2026-10-03T00:01', place: 'Apart' },
  { img: 'assets/images/photo/acec87225a03e42aa558da727ce59193.jpg', ts: '2026-09-28T17:45', place: 'Seongsu' },
  { img: 'assets/images/photo/c0ee9524afdafeb8f119e04e60ab7585.jpg', ts: '2026-09-20T19:22', place: 'Yeouido' },
  { img: 'assets/images/photo/da993b66927df07d9ff433164d61f4b1.jpg', ts: '2026-09-15T11:05', place: 'Apart' },
  { img: 'assets/images/photo/ed1e989114c94f1304bb16ec0c7679a8.jpg', ts: '2026-09-05T22:10', place: 'Myeongdong' },
  { img: 'assets/images/photo/HRnT3mvaoAAs7se.jpg', ts: '2026-08-28T18:40', place: 'Lotte World' },
  { img: 'assets/images/photo/HTmP4IRaEAAMLri.jpg', ts: '2026-08-20T15:12', place: 'Hongdae' },
  { img: 'assets/images/photo/HUFLbS9awAA9R5-.jpg', ts: '2026-08-15T20:10', place: 'Sinchon' },
  { img: 'assets/images/photo/photo_6255510487151875493_w.jpg', ts: '2026-08-08T13:30', place: 'Apart lama' },
  { img: 'assets/images/photo/HVH6YEGa4AEbtg8.jpg', ts: '2026-08-02T23:58', place: 'Hongdae' }
];

// ---------- Musik ----------
// [judul, artis, file audio, cover, (opsional) ID YouTube buat cover otomatis]
//   file audio : taruh hasil unduhanmu di assets/audio/ (nama bebas, sesuaikan di sini)
//   cover      : path lokal, link biasa (https://...), atau link Google Drive. Kalau dikosongin → pakai thumbnail YouTube dari ID di kolom ke-5.
const ALBUM = { name: 'Untuk Sastra-ku', by: 'Kaisar', cover: 'assets/images/music/a.jpg', updated: '2026-10-21T23:10' };
const SONGS = [
  ["An Art Gallery Could Never Be Unique As You", "mrbld", "assets/audio/mrld-an-art-gallery-could-never-be-as-unique-as-you.mp3", "", "FvAKtaH6Yzw"],
  ["Best Part (feat. H.E.R.)", "Daniel Caesar, H.E.R.", "assets/audio/02 Daniel Caesar - Best Part (feat. H.E.R.).mp3", "", "EkbrLgM3xfA"],
  ["P.S. I LOVE YOU", "Paul Partohap", "assets/audio/Paul Partohap - P.S. I LOVE YOU.mp3", "", "RumTrTLv-Ks"],
  ["The Most Beautiful Thing", "Bruno Major", "assets/audio/The Most Beautiful Thing - Bruno Major.mp3", "", "3gv-XKHj0rw"],
  ["Strawberries & Cigarettes", "Troye Sivan", "assets/audio/jmv_0214_thaisub_aeplephlng_strawberry_and_cigarette_troye_sivan.mp3", "", "Mw5mAozjC6M"],
];

// Kalender
const AGENDA = [
  ['2026-10-22', '10:00', 'anter sayangku beli make up', '#ff2d55', '', 'assets/images/event/makeup.png', ''],
  ['2026-10-22', '11:00', 'lunch', '#ff9500', '', 'assets/images/event/lunch.png', '12:00'],
  ['2026-10-23', '22:00', 'billiard', '#5856d6', '', 'assets/images/event/billiard.png', ''],
  ['2026-10-24', '14:00', 'nemenin nail art', '#ff2d55', '', 'assets/images/event/nailart.png', ''],
  ['2026-10-24', '16:00', 'hunting matcha', '#34c759', '', 'assets/images/event/matcha.png', ''],
];

// Catatan
const NOTES = [
  {
    id: 'suka',
    title: 'Hal-hal yang Sastra suka',
    ts: '2026-10-19T21:10',
    body: 'Kaisar\nKalo ketemu utamain physical touch\n\nDi peluk kalo lagi rewel\nDi puk-puk pas tidur\nStreet feeding'
  },
  {
    id: 'sastraku',
    title: 'Sastra-ku',
    ts: '2026-10-20T23:40',
    body: 'Tidur yang nyenyak, nduy-nya Kaisar. Besok, lusa, dan selamanya, aku bakal tetap jadi rumah paling aman buat kamu pulang'
  },
  {
    id: 'kebiasaan',
    title: 'Kebiasaan Sastra',
    ts: '2026-10-18T22:05',
    body: 'Nangis kalo lagi capek (kasih validasi)\nMarah-marah kalo lapar\nRibut sama dika dan jagad\nFomo sama hal baru (harus dipantau)\nKalo udah clingy berarti minta cium'
  },
  {
    id: 'cantik',
    title: 'Cantik',
    ts: '2026-10-22T13:10',
    body: 'Ya Tuhan... Sastra-ku, cantik. Cantik sekali'
  },
  {
    id: 'nothing',
    title: 'Nothing',
    ts: '2026-10-22T13:10',
    body: 'Sastra-ku akhir-akhir ini lagi suka pake jepitan rambut, lucunya...'
  }
];