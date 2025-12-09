import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";
import { toast } from "sonner";

interface Motorcycle {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: number;
  image: string;
  engine: string;
  mileage: string;
  description: string;
}

const motorcycles: Motorcycle[] = [
  {
    id: 1,
    name: "Honda CB400SF",
    brand: "Honda",
    year: 2018,
    price: 450000,
    image: "https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800",
    engine: "400cc",
    mileage: "12,000 км",
    description: "Легендарный японский мотоцикл в идеальном состоянии"
  },
  {
    id: 2,
    name: "Yamaha XJR1300",
    brand: "Yamaha",
    year: 2016,
    price: 580000,
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800",
    engine: "1300cc",
    mileage: "18,500 км",
    description: "Мощный классический байк прямо из Японии"
  },
  {
    id: 3,
    name: "Suzuki GSX-R750",
    brand: "Suzuki",
    year: 2019,
    price: 720000,
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800",
    engine: "750cc",
    mileage: "8,200 км",
    description: "Спортивный мотоцикл в топовой комплектации"
  },
  {
    id: 4,
    name: "Kawasaki Z900RS",
    brand: "Kawasaki",
    year: 2020,
    price: 890000,
    image: "https://images.unsplash.com/photo-1591967276946-36e98c3b94c2?w=800",
    engine: "900cc",
    mileage: "5,100 км",
    description: "Ретро-стиль с современными технологиями"
  },
  {
    id: 5,
    name: "Honda CB1000R",
    brand: "Honda",
    year: 2021,
    price: 950000,
    image: "https://images.unsplash.com/photo-1568772678995-45bee9a8d39e?w=800",
    engine: "1000cc",
    mileage: "3,800 км",
    description: "Премиальный нейкед с агрессивным дизайном"
  },
  {
    id: 6,
    name: "Yamaha MT-09",
    brand: "Yamaha",
    year: 2019,
    price: 670000,
    image: "https://images.unsplash.com/photo-1611415510184-c6f6e8141f88?w=800",
    engine: "900cc",
    mileage: "11,200 км",
    description: "Динамичный трёхцилиндровый мотоцикл"
  }
];

const services = [
  {
    title: "Техническое обслуживание",
    description: "Полная диагностика и регулярное ТО вашего мотоцикла",
    icon: "Wrench",
    price: "от 3,500 ₽"
  },
  {
    title: "Ремонт двигателя",
    description: "Капитальный ремонт и настройка силового агрегата",
    icon: "Settings",
    price: "от 15,000 ₽"
  },
  {
    title: "Электрика и диагностика",
    description: "Компьютерная диагностика и ремонт электросистем",
    icon: "Zap",
    price: "от 2,500 ₽"
  },
  {
    title: "Тюнинг и доработка",
    description: "Модификация и улучшение характеристик мотоцикла",
    icon: "Sparkles",
    price: "от 10,000 ₽"
  },
  {
    title: "Подвеска и тормоза",
    description: "Настройка и ремонт ходовой части",
    icon: "CircleDot",
    price: "от 4,000 ₽"
  },
  {
    title: "Кастомизация",
    description: "Индивидуальный дизайн и стайлинг",
    icon: "Palette",
    price: "от 20,000 ₽"
  }
];

const Index = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [activeSection, setActiveSection] = useState<string>("hero");

  const filteredMotorcycles = motorcycles.filter((moto) => {
    const brandMatch = selectedBrand === "all" || moto.brand === selectedBrand;
    const yearMatch = selectedYear === "all" || moto.year.toString() === selectedYear;
    const priceMatch = !maxPrice || moto.price <= parseInt(maxPrice);
    return brandMatch && yearMatch && priceMatch;
  });

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Заявка отправлена! Мы свяжемся с вами в ближайшее время.");
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Bike" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-gradient">Remzona54</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              {["hero", "services", "motorcycles", "booking", "history", "gallery", "contacts"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {section === "hero" && "Главная"}
                  {section === "services" && "Услуги"}
                  {section === "motorcycles" && "Мотоциклы"}
                  {section === "booking" && "Запись"}
                  {section === "history" && "История"}
                  {section === "gallery" && "Галерея"}
                  {section === "contacts" && "Контакты"}
                </button>
              ))}
            </div>

            <Button variant="default" size="sm" onClick={() => scrollToSection("booking")}>
              Записаться
            </Button>
          </div>
        </div>
      </nav>

      <section id="hero" className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-50" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Профессиональный <span className="text-gradient">ремонт</span> и{" "}
              <span className="text-gradient">продажа</span> японских мотоциклов
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Прямые поставки из Японии. Качественный сервис. Индивидуальный подход к каждому клиенту.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" onClick={() => scrollToSection("motorcycles")} className="hover-lift">
                <Icon name="ShoppingCart" size={20} className="mr-2" />
                Каталог мотоциклов
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection("services")} className="hover-lift">
                <Icon name="Wrench" size={20} className="mr-2" />
                Наши услуги
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Наши услуги</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Полный спектр услуг по обслуживанию и ремонту мотоциклов любой сложности
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="hover-lift glass border-border/50 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} size={24} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">{service.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="motorcycles" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Мотоциклы из Японии</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Эксклюзивные мотоциклы с прямой поставкой из Страны восходящего солнца
            </p>
          </div>

          <Card className="mb-8 glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Icon name="Filter" size={20} className="mr-2" />
                Фильтры
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label>Марка</Label>
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все марки</SelectItem>
                      <SelectItem value="Honda">Honda</SelectItem>
                      <SelectItem value="Yamaha">Yamaha</SelectItem>
                      <SelectItem value="Suzuki">Suzuki</SelectItem>
                      <SelectItem value="Kawasaki">Kawasaki</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Год</Label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все годы</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                      <SelectItem value="2020">2020</SelectItem>
                      <SelectItem value="2019">2019</SelectItem>
                      <SelectItem value="2018">2018</SelectItem>
                      <SelectItem value="2016">2016</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Макс. цена</Label>
                  <Input
                    type="number"
                    placeholder="1,000,000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>

                <div className="flex items-end">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedBrand("all");
                      setSelectedYear("all");
                      setMaxPrice("");
                    }}
                  >
                    Сбросить
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMotorcycles.map((moto, index) => (
              <Card
                key={moto.id}
                className="overflow-hidden hover-lift glass border-border/50 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={moto.image}
                    alt={moto.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <Badge className="absolute top-4 right-4 bg-primary/90">
                    {moto.year}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{moto.name}</CardTitle>
                  <CardDescription className="text-base">{moto.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-muted-foreground">
                      <Icon name="Gauge" size={16} className="mr-2" />
                      <span>{moto.engine}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Icon name="MapPin" size={16} className="mr-2" />
                      <span>{moto.mileage}</span>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-primary">
                      {moto.price.toLocaleString("ru-RU")} ₽
                    </span>
                    <Button size="sm">
                      <Icon name="Phone" size={16} className="mr-2" />
                      Узнать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMotorcycles.length === 0 && (
            <div className="text-center py-16">
              <Icon name="SearchX" size={64} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-xl text-muted-foreground">
                Мотоциклов по выбранным параметрам не найдено
              </p>
            </div>
          )}
        </div>
      </section>

      <section id="history" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Наша история</h2>
            </div>

            <div className="space-y-12">
              <Card className="glass border-border/50 animate-fade-in">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                      <Icon name="Building2" size={32} className="text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Основание мастерской</CardTitle>
                      <p className="text-muted-foreground">2010 год</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg leading-relaxed">Remzona54 начала свою работу как небольшая мастерская для энтузиастов мотоциклов. Наша страсть к мототехнике и стремление предоставлять качественный сервис быстро завоевали доверие клиентов в регионе.</p>
                </CardContent>
              </Card>

              <Card className="glass border-border/50 animate-fade-in">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                      <Icon name="Plane" size={32} className="text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Прямые поставки из Японии</CardTitle>
                      <p className="text-muted-foreground">2015 год</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg leading-relaxed">
                    Установив прямые связи с японскими аукционами и дилерами, мы начали привозить
                    эксклюзивные мотоциклы напрямую из Страны восходящего солнца. Каждый мотоцикл
                    проходит тщательный отбор и проверку перед отправкой в Россию.
                  </p>
                </CardContent>
              </Card>

              <Card className="glass border-border/50 animate-fade-in">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mr-4">
                      <Icon name="Trophy" size={32} className="text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Премиальный сервис</CardTitle>
                      <p className="text-muted-foreground">Сегодня</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg leading-relaxed">
                    Сегодня Remzona54 — это команда профессионалов, современное оборудование и
                    сотни довольных клиентов. Мы продолжаем привозить лучшие японские мотоциклы
                    и обслуживаем байки любой сложности с гарантией качества и индивидуальным подходом.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Галерея работ</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Примеры наших проектов и довольные клиенты
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              "https://images.unsplash.com/photo-1558980664-769d59546b3d?w=800",
              "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800",
              "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800",
              "https://images.unsplash.com/photo-1591967276946-36e98c3b94c2?w=800",
              "https://images.unsplash.com/photo-1568772678995-45bee9a8d39e?w=800",
              "https://images.unsplash.com/photo-1611415510184-c6f6e8141f88?w=800"
            ].map((img, index) => (
              <div
                key={index}
                className="relative h-80 overflow-hidden rounded-lg hover-lift glass border border-border/50 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={img}
                  alt={`Галерея ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Записаться на сервис</h2>
            <p className="text-xl text-muted-foreground">
              Оставьте заявку, и мы свяжемся с вами в ближайшее время
            </p>
          </div>

          <Card className="glass border-border/50 animate-scale-in">
            <CardContent className="pt-6">
              <form onSubmit={handleBooking} className="space-y-6">
                <div>
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input id="name" placeholder="Иван Иванов" required />
                </div>

                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" type="tel" placeholder="+7 (900) 123-45-67" required />
                </div>

                <div>
                  <Label htmlFor="service">Услуга</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maintenance">Техническое обслуживание</SelectItem>
                      <SelectItem value="engine">Ремонт двигателя</SelectItem>
                      <SelectItem value="electrics">Электрика и диагностика</SelectItem>
                      <SelectItem value="tuning">Тюнинг и доработка</SelectItem>
                      <SelectItem value="suspension">Подвеска и тормоза</SelectItem>
                      <SelectItem value="custom">Кастомизация</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="motorcycle">Модель мотоцикла</Label>
                  <Input id="motorcycle" placeholder="Honda CB400SF" />
                </div>

                <div>
                  <Label htmlFor="message">Комментарий</Label>
                  <Input id="message" placeholder="Дополнительная информация" />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить заявку
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Контакты</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass border-border/50 text-center hover-lift">
              <CardContent className="pt-6">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Icon name="MapPin" size={32} className="text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-2">Адрес</h3>
                <p className="text-muted-foreground">г. Новосибирск, ул. Мотоциклистов, 54</p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50 text-center hover-lift">
              <CardContent className="pt-6">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Phone" size={32} className="text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-2">Телефон</h3>
                <p className="text-muted-foreground">+7 (383) 555-54-54</p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50 text-center hover-lift">
              <CardContent className="pt-6">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Clock" size={32} className="text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-2">Часы работы</h3>
                <p className="text-muted-foreground">Пн-Сб: 9:00 - 20:00<br />Вс: выходной</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 bg-secondary/50 border-t border-border/50">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Icon name="Bike" size={28} className="text-primary" />
            <h3 className="text-xl font-bold text-gradient">Remzona54</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Премиальный сервис и продажа японских мотоциклов
          </p>
          <div className="flex justify-center space-x-6 mb-6">
            <Button variant="ghost" size="icon">
              <Icon name="Instagram" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Facebook" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Youtube" size={20} />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Remzona54. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;