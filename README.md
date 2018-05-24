// untuk dapetin daftar semua buku

  router.get('/', getAllBook)

// post login

  router.post('/login', Login ),

// post register

router.post('/register', Register)

// post tambah buku baru

router.post('/upload', upload.single('item'), sendUploadToGCS, addNewBook)

// get detail buku

router.get('/openbook/:id', openBook)
