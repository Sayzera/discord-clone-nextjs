# Docker

- Run

  - docker run node-app-image
  - docker run -p 3000:3000 -d --name node-app node-app-image
  - | --name node-app = çalışan docker image isim verir
  - | -d = arka planda çalışması için
  - | -p 3000:3000
  - docker inspect docker-node-mongo-1
  - | docker containerın ayrıntılı bilgisini verir
  - docker network ls
  - | Docker ağlarını listeler
  - docker logs -f <container-id>
  - | docker çıktılarını anlık görmemizi sağlar
  - docker build -t node-app-image .
  - docker push sayzera1/node-app-image
  - |-- docker huba yükler
  - docker pull sayzera1/node-app-image
  - |-- docker hubdan indirir
  - docker image tag node-app-image sayzera1/node-app-image
  - |-- bu imajı sayzera1/node-app-image olarak etiketler
  - docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml build node-app
  - |-- docker-compose ile node-app serviceini yeniden oluşturur
  - docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml push node-app
  - |-- docker-compose ile node-app serviceini prod ortamına yükler
    ---> docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml pull
    |-- docker-hubdan prod ortamına ait imajları indirir ve docker-compose ile çalıştırır
    - Localdeki image build edilir
    - Docker huba push edilir
    - Docker hubdan pull edilir
    - Docker compose ile çalıştırılır (açık ise önce kapatılır)
    - Örnek -> docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d --build --force-recreate

  -3000= bilgisayarın portu diğer 3000 dockerın içindeki uygulamanın portu

  - docker ps
  - | Çalışan kontainerları listeler
  - docker rm <container-id-
  - | Kontainerı siler
  - docker exec -it node-app /bin/sh
  - | -docker cointainerın içindeki klasorleri gösteri
  - cat index.js
  - | Dosyanın içerisini açar

  - docker run -v ${PWD}:/app:ro -v /app/node_modules -p 3000:3000 -d --name node-app node-app-image
  - | -v /app/node_modules klasorundeki packageları kullanması için
  - | ${PWD} kök dizindekileri :/app kopyala
  - | /app:ro - read only
  - docker exec -it node-app bash
  - docker ps -a
  - | tüm containerları gösterir
  - docker logs node-app
  - | container hakkında bilgi verir çalışma durumu vs
  - docker run -v ${PWD}:/app:ro -v /app/node_modules --env-file ./.env -p 3000:4000 -d --name node-app node-app-image
  - |--env-file ./.env kök dizinde bulunan env dosyasını belirtiyoruz bu dosya otomatik olarak docker içerisine kopyalanıyor
  - docker volume ls
  - |-- docker için tutulan kalıcı dataları listeler
  - docker volume prune
  - |-- docker için tutulan verileri kalıcı olarak siler , anonimler silinir.
  - docker rm node-app -fv
  - |--containerda tutulan ve onunla ilgili olan verileride zorunlu olarak siler

- Docker Compose

  - docker-compose up -d
  - |-- Docker compose dosyasını çalıştırır ve container oluşturur
  - docker-compose down -v
  - |-- Docker compose aracılığıyla başlatılan tüm containerları siler
  - docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d
  - |--dev ortamındaki dockercompose çalıştırır

  - docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml down -v
  - docker-compose -f "docker-compose.dev.yml" down

  - docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d --build

  - docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d --build --no-deps node-app
  - next js
  - docker exec -it frontend /bin/sh // frontend containerına girer
    |-- node-app serviceini yeniden oluşturur
    |-- --no-deps node-app serviceini yeniden oluşturur ancak bağımlılıklarını oluşturmaz örneğin mongo db , redis gibi bunları tekrardan başlatmaz

  - docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d --build --force-recreate
    |-- node-app serviceini yeniden oluşturur
    |-- --force-recreate node-app serviceini yeniden oluşturur ancak bağımlılıklarını oluşturmaz örneğin mongo db , redis gibi bunları tekrardan başlatmaz

  - docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up -d --scale node-app=2
    |-- node-app=2 2 tane node-app containerı oluşturur
  - |-- --build yeni bir modül var dockerı tekrardan oluştur demek

* ====================== MONGO DB =====================================

  - docker exec -it docker-node-mango-1 mongosh -u "admin" -p "admin"
  - |-- windows üzerinden docker shell açma
  - use mydb
  - |-- eğer yoksa oluşturur varsa ise o dbyi seçer
  - db.books.insertOne({"name": "sezer"})
  - |-- Ekleme yapar
  - db.books.find({})
  - |--Tümünü seçer getirir
  - show dbs
  - |--dbleri gösterir

* ====================== Redis =====================================

- docker exec -it docker-compose-nodejs-redis-1 redis-cli
- |-- redis shell açma
- keys \*
- |-- tüm keyleri gösterir
- get key
- |-- keyin değerini gösterir
- set key value
- |-- keyin değerini set eder
- del key
- |-- keyi siler
- flushall
- |-- tüm keyleri siler
- exit
- |-- çıkış yapar

* ====================== PORT =====================================
  -Nginx konteynırı, genellikle HTTP trafiğini dinlemek için 80 numaralı portu kullanır. Docker Compose dosyasındaki port yönlendirme ayarı, nginx konteynırının 80 numaralı portunu host makinanın 3000 numaralı portuna bağlamaktadır. Bu sayede, host makinadaki 3000 numaralı port üzerinden gelen istekler nginx konteynırına yönlendirilerek, nginx servisinin çalıştığı konteynıra ulaşılmasını sağlar.

* ====================== Ubuntu =====================================

- export SESSION_SECRET=secret
- curl ifconfig.me
- | ip adresini gösterir

- | ls -la
- | |-- dosyaları listeler
- |-- env değişkeni oluşturur
- export PORT=3000
- |-- env değişkeni oluşturur
- printenv
- |-- env değişkenlerini gösterir
- vi .env
- |-- .env dosyasını açar
- :w
- |-- kaydet
- :q
- |-- çıkış yapar
- :wq
- |-- kaydet ve çıkış yapar
- :q!
- |-- çıkış yapar
- :w!
- |-- kaydet
- :wq!
- |-- kaydet ve çıkış yapar
- set -o allexport; source /root/.env; set +o allexport
- |-- kök dizindeki .profile dosyasının en altına yazılır
- |-- .env dosyasındaki değişkenleri env değişkenlerine aktarır, bu sayede docker-compose içerisinde env dosyasındaki değişkenleri kullanabiliriz. Env dosyasındaki değişkenler kabuk ortamında geçerli olur.

* ====================== Ubuntu Cloud =====================================
  - ssh root@138.197.177.18
  - |-- cloud sunucuya bağlanma
  - mkdir app
  - |-- app klasörü oluşturur
  - cd app
  - git clone https://github.com/Sayzera/docker-compose-nodejs .
  - |-- . git klasörünü oluşturur

\*= ====================== servera atmak için =====================================

- [local] docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml build
- [docker-hub] docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml push
- [server] docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml pull
- [server] docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d
  - alternatif [server] docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d --no-deps node-app

* ====================== Dockert Towers =====================================

- [towerWatch] docker run -d --name watchtower -e WATCHTOWER_TRACE=true -e WATCHTOWER_DEBUG=true -e WATCHTOWER_POLL_INTERVAL=50 -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower <container adı>
- |-- watchtower containerı oluşturur
- |-- -e WATCHTOWER_POLL_INTERVAL=50 50 saniyede bir kontrol eder
- |-- -e WATCHTOWER_TRACE=true logları gösterir
- |-- -e WATCHTOWER_DEBUG=true logları gösterir
- |-- -v /var/run/docker.sock:/var/run/docker.sock docker socket bağlantısı
- |-- containrrr/watchtower watchtower image
- |-- <container adı> container adı
- docker logs watchtower
- |-- watchtower loglarını gösterir
- docker stop watchtower
- |-- watchtower containerı durdurur
- docker rm watchtower
- |-- watchtower containerı siler
- |- -e parametresi watchtower için belirli ortam değişkenlerinin ayarlanmasına olanak tanır ve bu değişkenler watchtower containerı içerisinde kullanılabilir hale gelir.

* ====================== Docker Swarm =====================================

- ip add
- |-- ip adreslerini gösterir > eth0 de yazan ip adresini alırız
- docker swarm init --advertise-addr <ip>
- |-- swarm oluşturur
- docker stack deploy -c docker-compose.yaml -c docker-compose.prod.yaml myapp
- |-- stack oluşturur
- docker stack ls
- |-- stack listesini gösterir
- docker stack rm myapp
- |-- stack siler
- docker stack services myapp
- |-- stack servislerini gösterir
- docker stack ps myapp
- |-- stack processlerini gösterir

* update
  [local] docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml build
  [local] docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml push
  <!-- [server] docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml pull -->

  [server] docker stack deploy -c docker-compose.yaml -c docker-compose.prod.yaml myapp

  \*====================== Swap =====================================

- sudo swapoff -a
  |-- swap kapatır

- sudo dd if=/dev/zero of=/swapfile bs=1M count=1024
  |-- swapfile oluşturur

-sudo mkswap /swapfile
|-- swapfile oluşturur

sudo swapon /swapfile
|-- swapfile oluşturur

- ====================== Replicas =====================================
  deploy:
  replicas: 2
  Yüksek kullanılabilirlik: Servis, bir kopyasında arıza olması durumunda diğer kopyaları tarafından hizmet vermeye devam edebilir. Bu sayede uygulamanın kesintiye uğraması engellenir.

  Yüksek performans: Birden fazla kopya, uygulamanın daha yüksek performansla çalışmasını sağlar. Örneğin, yüksek trafikli bir uygulamada bir kopya, talepleri işlemeye yetmeyebilir, ancak birden fazla kopya, talepleri paralel olarak işleyerek daha yüksek performans sağlar.

  Yüksek ölçeklenebilirlik: Servis, artan taleplere göre daha fazla kopya ile ölçeklendirilebilir. Bu sayede uygulama, artan taleplere göre hızlıca ölçeklendirilebilir ve yüksek trafik altında bile performans kaybı yaşanmaz.

  Yüksek güvenilirlik: Servisin birden fazla kopyası, uygulamanın daha güvenilir olmasını sağlar. Örneğin, bir kopyasında bir güvenlik açığı bulunması durumunda, diğer kopyalar bu açığı kapatabilir ve uygulamanın güvenliği sağlanabilir.

  
- ====================== Kill =====================================
-sudo lsof -i -P -n | grep 3000
|-- 3000 portunu kullanan processleri gösterir
sudo kill -9 <process id> 
|-- processi öldürür -9 zorla öldürür

- ====================== Docker Disk Temizleme =====================================
docker system prune -a
