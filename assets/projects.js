/* =====================================================================
   Damaris Chege — selected projects
   Category filtering + case-study dialog. Project copy lives in DATA so
   the cards and case studies stay maintainable in one place.
   ===================================================================== */

(function () {
    "use strict";

    var DATA = {
        "ecommerce-api": {
            index: "01",
            title: "E-Commerce REST API",
            category: "Backend Development",
            status: "Implemented backend · Deployed",
            tone: "shipped",
            image: "assets/project-ecommerce-api.png",
            imageKind: "screenshot",
            imageAlt: "Ecommerce API landing page with links to the documentation and navigation for users, products, cart, orders and promotions.",
            lede: "A Django REST Framework backend that models the core operations of an online store: user accounts, a product catalogue, shopping carts, orders, inventory and promotions, exposed as a documented REST API.",
            overview: "The API turns the common e-commerce domains into one backend contract. Customers can register and authenticate, browse and search products, manage a cart and place orders; the store can track stock, validate promotions and review activity through the Django admin. Interactive Swagger documentation describes the available endpoints for anyone integrating with it.",
            problem: "An e-commerce front end needs one consistent contract for catalogue, cart, order and inventory operations. Without a backend enforcing stock rules, coupon validity and access control, every client reimplements the same business logic and the data drifts. The project set out to provide that contract, with authentication and documentation suitable for real integration work.",
            role: "I designed and built the API end to end: domain models, serializers, viewsets and routing, JWT authentication, filtering and search, and the containerised PostgreSQL environment. I documented the endpoints with Swagger/OpenAPI and exercised the API with Postman.",
            architecture: [
                "Python and Django REST Framework, organised by domain: users, products, cart, orders, inventory and promotions.",
                "PostgreSQL as the relational store, with Django ORM migrations defining the schema.",
                "JWT authentication for protected endpoints, with permission checks on object access.",
                "Docker and Docker Compose for a reproducible application and database environment.",
                "Swagger/OpenAPI for interactive endpoint documentation."
            ],
            implementation: [
                "Modelled products, categories, brands and reviews as related tables, with search and filtering exposed through query parameters.",
                "Implemented cart and order flows so totals and line items are calculated server-side rather than trusted from the client.",
                "Recorded inventory stock movements so quantity changes stay traceable instead of silently overwriting the previous value.",
                "Added coupon validation and low-stock monitoring as part of the promotions and inventory modules.",
                "Kept serializers responsible for input validation so invalid payloads fail with clear field-level errors."
            ],
            challenges: [
                {
                    title: "Keeping stock consistent",
                    text: "Cart, order and inventory operations touch the same quantities. Stock adjustments are recorded as movements, and order creation validates availability before committing, which leaves a history of why a quantity changed."
                },
                {
                    title: "Documentation drift",
                    text: "An API is only useful if its documentation matches its behaviour. Grouping endpoints by domain and reviewing the generated schema kept the Swagger reference aligned with the implemented routes."
                },
                {
                    title: "Local reproducibility",
                    text: "Containerising PostgreSQL alongside the application removed environment differences between local development and the Render deployment."
                }
            ],
            outcome: "A working REST API with catalogue, cart, order, inventory and promotion endpoints, interactive documentation and a deployed demo. The deployment runs on Render's free tier, so the instance may need time to wake or may be unavailable. No performance, traffic or adoption metrics are claimed.",
            tech: ["Python", "Django REST Framework", "PostgreSQL", "JWT", "Docker", "Swagger"],
            links: [
                { label: "GitHub repository", href: "https://github.com/Dama5323/alx_ecommerce_api", icon: "github" },
                { label: "Render deployment", href: "https://alx-ecommerce-cart.onrender.com/", icon: "external", note: "Free instance; may sleep." }
            ]
        },

        "weather-dashboard": {
            index: "02",
            title: "Weather Dashboard",
            category: "Frontend Development · Full-Stack Application",
            status: "Implemented application · Live",
            tone: "shipped",
            image: "assets/project-weather.png",
            imageKind: "screenshot",
            imageAlt: "WeatherDash interface showing current conditions for Kikuyu with humidity, wind, sunrise, sunset and an outfit advisor panel.",
            lede: "A responsive weather dashboard that turns a location into current conditions, a five-day forecast and practical guidance, combining geolocation, city search, favourites, voice input and outfit recommendations.",
            overview: "The application detects the visitor's location or accepts a search, then presents current conditions, a five-day forecast and supporting detail such as humidity, wind, sunrise and sunset. Recent searches and favourites make returning to a place quick, and the outfit advisor translates the forecast into a suggestion rather than leaving the visitor to interpret the numbers.",
            problem: "Most weather lookups answer only for major cities and present figures without context. This build focused on reliable small-town lookup, fast repeated searches and a recommendation layer that turns conditions into something a person can act on.",
            role: "I built the React front end and the OpenWeatherMap integration, including the weather and geolocation hooks, search and recent-search experience, forecast views and the outfit recommendation logic. I also handled the error states and deployed the application to Vercel.",
            architecture: [
                "React single-page application bundled with Vite.",
                "Custom weather and geolocation hooks separate data fetching and browser APIs from presentation.",
                "React Query caches forecast responses to limit API calls and unnecessary refetches.",
                "OpenWeatherMap endpoints supply current conditions and forecast data; reverse geocoding resolves coordinates to a place name.",
                "Tailwind CSS for the responsive layout, with recent searches persisted in the browser."
            ],
            implementation: [
                "Requests use coordinates rather than city-name strings, which fixed missing results for smaller towns and suburbs.",
                "Search input is normalised before a request, including stripping punctuation added by voice recognition.",
                "Recent searches and favourites let a visitor return to a location without retyping it.",
                "Error boundaries return readable messages and a recovery action rather than rendering raw error objects.",
                "The layout adapts from a stacked mobile view to a two-column desktop dashboard."
            ],
            challenges: [
                {
                    title: "Small towns returned no data",
                    text: "City-name queries failed for smaller locations. Switching to coordinate-based requests with reverse geocoding made lookup reliable beyond major cities."
                },
                {
                    title: "Voice search punctuation",
                    text: "Speech recognition appended periods to place names, producing failed requests. A normalisation step strips punctuation and collapses whitespace before searching."
                },
                {
                    title: "Conflicting geolocation state",
                    text: "Duplicate state and effects caused inconsistent location handling. Consolidating them into one geolocation hook with a single state object removed the race between manual search and automatic detection."
                },
                {
                    title: "API rate limits",
                    text: "Frequent refetches during development exhausted the weather API quota. React Query with a five-minute stale time and cached forecast data reduced redundant calls."
                }
            ],
            outcome: "A deployed application with a verified live demo, covering current conditions, forecast, recent searches and outfit recommendations. No user, traffic or forecast-accuracy metrics are claimed.",
            tech: ["React", "Vite", "Tailwind CSS", "OpenWeatherMap API", "React Query", "Vercel"],
            links: [
                { label: "GitHub repository", href: "https://github.com/Dama5323/alx_project-capstone", icon: "github" },
                { label: "Live demo", href: "https://alx-weatherdash.vercel.app/", icon: "external" }
            ]
        },

        "payment-integration": {
            index: "03",
            title: "Payment Integration",
            category: "Backend Development · API Integration",
            status: "Implemented integration",
            tone: "shipped",
            image: "assets/project-payment.png",
            imageKind: "screenshot",
            imageAlt: "Chapa hosted checkout in test mode, listing wallet, local cards, mobile banking and international payment options for an ETB 10.00 payment.",
            lede: "A Django travel-booking application with a Chapa payment flow: create a booking, initiate payment, verify the result server-side, track the transaction and send confirmation asynchronously.",
            overview: "The project covers the part of payments that happens around the checkout page. A booking produces a pending payment record, the visitor completes payment on Chapa's hosted page, and the application verifies the outcome before marking the booking paid. Confirmation email is dispatched by a background worker.",
            problem: "Accepting an online payment means more than redirecting to a checkout page. The application has to create a pending transaction, hand off to the provider, verify what actually happened, update its own records and notify the customer without making them wait.",
            role: "I implemented the booking and payment flow: Chapa initiation and verification requests, transaction status tracking, and the asynchronous confirmation email dispatched through Celery.",
            architecture: [
                "Django application with booking and payment records held through the ORM.",
                "Server-to-server calls to the Chapa API for payment initiation and verification.",
                "A Celery worker for confirmation email so the request cycle is not blocked by delivery.",
                "Checkout completes on Chapa's hosted page, with the result reconciled back in the application."
            ],
            implementation: [
                "Booking creation produces a payment record in a pending state before the provider is contacted.",
                "Initiation returns the checkout reference used to hand the visitor to Chapa.",
                "Verification queries the provider for the authoritative status instead of trusting a browser redirect alone.",
                "Payment records move through explicit states so a transaction is never silently marked complete.",
                "Confirmation email is queued after successful verification."
            ],
            challenges: [
                {
                    title: "Trusting the redirect",
                    text: "A browser return URL can be replayed or interrupted. The integration verifies the transaction with Chapa's API before treating a booking as paid."
                },
                {
                    title: "Repeated verification",
                    text: "A visitor can return to the callback more than once. Status checks and explicit state transitions keep repeated requests from producing duplicate outcomes."
                },
                {
                    title: "Blocking email delivery",
                    text: "Sending confirmation inside the request made the payment response depend on an SMTP round trip. Moving it to Celery decoupled the two."
                }
            ],
            outcome: "A working integration exercised against Chapa's test checkout, covering booking creation, payment initiation, verification, status tracking and queued confirmation email. It has not processed live customer payments, and no transaction volumes or uptime figures are claimed.",
            tech: ["Python", "Django", "Chapa API", "Celery"],
            links: [
                { label: "GitHub repository", href: "https://github.com/Dama5323/alx_travel_app_0x02", icon: "github" }
            ]
        },

        "aws-ecommerce": {
            index: "04",
            title: "AWS E-Commerce Architecture",
            category: "Cloud & Infrastructure",
            status: "Architecture study · Design",
            tone: "design",
            image: "assets/project-aws-ecommerce.png",
            imageKind: "diagram",
            imageAlt: "AWS architecture diagram: WAF and CloudFront feed an application load balancer, with Elastic Beanstalk, EC2 Auto Scaling and RDS across two availability zones, plus S3, SNS and CloudWatch.",
            lede: "A reference architecture for an e-commerce platform that separates edge, application, data and messaging concerns inside a controlled AWS network boundary.",
            overview: "The diagram shows a storefront request path from AWS WAF and CloudFront through an application load balancer into a VPC. The application tier runs on Elastic Beanstalk with EC2 Auto Scaling across two availability zones, transactional data sits in Amazon RDS, objects are stored in S3, notifications leave through SNS, and CloudWatch and CloudTrail provide observability and audit history.",
            problem: "A single application server handling storefront traffic, order processing and static assets becomes both the bottleneck and the blast radius. The design needed a path that terminates and filters traffic at the edge, isolates compute inside private networking, keeps the database off the public internet and removes non-critical work from the request path.",
            role: "I produced the architecture design and the accompanying service and traffic-flow explanation. This is a design study: it documents a proposed deployment topology rather than a production system I operated.",
            architecture: [
                "AWS WAF filters requests before CloudFront caches and distributes storefront assets and traffic.",
                "An Application Load Balancer distributes requests to the application tier inside a VPC.",
                "Elastic Beanstalk manages the application environment across two availability zones, with EC2 Auto Scaling adjusting capacity.",
                "Amazon RDS holds transactional data in the private subnets rather than being exposed publicly.",
                "Amazon S3 stores objects, Amazon SNS handles notifications, and CloudWatch and CloudTrail cover monitoring and audit logging."
            ],
            implementation: [
                "Static assets are served through CloudFront so the application tier is not asked to return files it does not own.",
                "The application tier sits in private subnets behind the load balancer; only the edge is publicly reachable.",
                "Compute is spread across two availability zones so the loss of one does not remove the ability to serve requests.",
                "Notification work is pushed to SNS instead of blocking the customer request.",
                "Logging and metrics are treated as part of the topology rather than an afterthought."
            ],
            challenges: [
                {
                    title: "Separating tiers without over-splitting",
                    text: "Every additional service adds operational overhead. The design keeps a managed application platform while isolating data, storage and messaging, rather than introducing a service per function."
                },
                {
                    title: "Protecting the database",
                    text: "RDS is kept in private subnets and reached only from the application tier, which removes the most direct route to customer data."
                },
                {
                    title: "Availability across zones",
                    text: "Compute and data are placed across two availability zones so a single-zone failure does not take the platform offline."
                }
            ],
            outcome: "A documented architecture and traffic-flow study published as a technical post. No deployment, load test or availability measurement is claimed.",
            tech: ["AWS WAF", "CloudFront", "Elastic Beanstalk", "EC2 Auto Scaling", "Amazon RDS", "S3", "SNS", "CloudWatch"],
            links: [
                { label: "Architecture notes", href: "https://www.linkedin.com/posts/dama5323_alx-aws-cloudarchitecture-activity-7356348037553606662-GYuL", icon: "external" }
            ]
        },

        "secure-file-storage": {
            index: "05",
            title: "AWS Secure File Storage",
            category: "Cloud & Infrastructure",
            status: "Architecture study · Design",
            tone: "design",
            image: "assets/project-s3-storage.png",
            imageKind: "diagram",
            imageAlt: "AWS secure file storage diagram: Cognito and Amplify clients pass through CloudFront and API Gateway to Lambda, which issues pre-signed S3 URLs, with KMS, DynamoDB, IAM, CloudWatch, Macie and Rekognition supporting the flow.",
            lede: "A storage architecture where clients never touch the bucket directly: authentication through Cognito, authorisation through Lambda, and short-lived pre-signed URLs for upload and download.",
            overview: "The design brokers file access instead of publishing a bucket. Cognito authenticates the client, API Gateway fronts the upload, download and sharing endpoints, and Lambda decides whether the request is allowed before returning a short-lived pre-signed URL. S3 holds the objects with KMS encryption, versioning and lifecycle rules; DynamoDB holds metadata; CloudTrail, CloudWatch and Macie record activity and inspect content.",
            problem: "Direct public bucket access is the usual shortcut and the usual breach. The design needed authenticated uploads, controlled downloads, encryption at rest, content inspection and a delivery path that scales without routing file bytes through the application.",
            role: "I designed the upload and download flows and documented the responsibilities of each service, including where authentication, authorisation, encryption and content inspection sit. This is an architecture study, not a deployed environment.",
            architecture: [
                "Amazon Cognito authenticates users, with the client hosted through Amazon Amplify.",
                "CloudFront delivers the front end; API Gateway fronts the upload, download and sharing endpoints.",
                "AWS Lambda authorises requests and issues short-lived pre-signed S3 URLs.",
                "Amazon S3 stores objects with KMS-managed encryption, versioning and lifecycle policies.",
                "Amazon DynamoDB holds object metadata, while IAM scopes Lambda's permissions to only the actions it needs.",
                "CloudWatch, CloudTrail and Macie provide monitoring, audit logging and sensitive-data discovery, with Rekognition available for image inspection."
            ],
            implementation: [
                "Uploads are authorised by Lambda before a pre-signed URL is returned, so the bucket is never writable directly from the browser.",
                "Downloads follow the same pattern, keeping object access short-lived and auditable.",
                "Objects are encrypted with KMS and protected by versioning and lifecycle rules.",
                "Metadata is stored separately in DynamoDB so listing and lookup do not require scanning the bucket.",
                "Access logs and data-discovery findings are collected for review rather than assumed."
            ],
            challenges: [
                {
                    title: "No public bucket",
                    text: "Both upload and download are brokered through Lambda-issued pre-signed URLs, which keeps the bucket private while still letting clients transfer files directly to S3."
                },
                {
                    title: "Least privilege",
                    text: "Lambda needs to sign URLs and read metadata, not administer the account. IAM policies are scoped to those actions and the specific resources."
                },
                {
                    title: "Content governance",
                    text: "Encryption, versioning, lifecycle rules and Macie inspection address confidentiality, recovery and retention as separate concerns instead of relying on one control."
                }
            ],
            outcome: "A documented storage architecture covering authenticated upload, controlled download, encryption, lifecycle management and monitoring. It has not been deployed as a production file service, and no throughput or cost figures are claimed.",
            tech: ["Amazon S3", "CloudFront", "AWS Lambda", "API Gateway", "Cognito", "KMS", "IAM", "DynamoDB"],
            links: [
                { label: "Architecture notes", href: "https://www.linkedin.com/posts/dama5323_aws-cloudarchitecture-backendengineering-activity-7359147748832514049-H4XM", icon: "external" }
            ]
        },

        "black-friday": {
            index: "06",
            title: "Black Friday Traffic Scalability",
            category: "Systems Engineering · Cloud Architecture",
            status: "Architecture study · Design",
            tone: "design",
            image: "assets/project-blackfriday.jpg",
            imageKind: "diagram",
            imageAlt: "Scalability diagram showing pre-warmed elastic load balancing, an auto scaling group with scheduled scaling and lightweight EC2 instances, and an RDS proxy in front of the database.",
            lede: "An infrastructure strategy for predictable traffic peaks: prepare capacity before the event, scale on a schedule rather than in reaction, and shield the database from connection fan-out.",
            overview: "The design targets a known peak rather than an unknown one. Elastic Load Balancing is pre-warmed, EC2 Auto Scaling adds capacity on a schedule with lightweight instances for burst, and Amazon RDS Proxy pools connections between the application tier and the database. Infrastructure Event Management is run ahead of the event to confirm the environment can take the expected load.",
            problem: "Traffic spikes are predictable but still break systems. Cold load balancers, scale-out that begins too late, and a database overwhelmed by new application connections turn a sales event into an outage.",
            role: "I designed the scaling strategy and documented the sequence: pre-warm the entry point, scale compute on a schedule, use lighter instances for burst capacity and put a connection pool in front of the database.",
            architecture: [
                "Elastic Load Balancing as the entry point, pre-warmed ahead of the event.",
                "EC2 Auto Scaling with scheduled scaling, adding capacity before the expected peak rather than after it.",
                "A lightweight AMI for burst instances so scale-out completes faster.",
                "Amazon RDS Proxy between the application tier and the database to pool and reuse connections.",
                "Infrastructure Event Management (IEM) run ahead of the event to validate readiness."
            ],
            implementation: [
                "Capacity changes are scheduled against known peak windows instead of relying only on reactive metrics.",
                "Pre-warming the load balancer removes the delay between the first surge and the balancer being ready for it.",
                "Burst instances use a minimal image, reducing the time between a scaling decision and a serving instance.",
                "RDS Proxy absorbs the connection fan-out created by many short-lived application instances.",
                "Non-critical work is kept off the request path so the database is not asked to do work that can happen later."
            ],
            challenges: [
                {
                    title: "Scaling starts too late",
                    text: "Reactive scaling only begins after the spike is already visible. Scheduled scaling and a pre-warmed load balancer put capacity in place before the event."
                },
                {
                    title: "Database connection exhaustion",
                    text: "Each new application instance opens its own connections. RDS Proxy pools them so compute can scale without overwhelming the database."
                },
                {
                    title: "Slow instance start-up",
                    text: "A full application image delays burst capacity. A lightweight AMI shortens the interval between adding an instance and serving traffic."
                }
            ],
            outcome: "A documented scaling strategy covering pre-warming, scheduled capacity, connection pooling and event readiness. It is a design exercise; no load-test results or production traffic figures are claimed.",
            tech: ["Elastic Load Balancing", "EC2 Auto Scaling", "Amazon RDS Proxy", "IEM", "AWS"],
            links: [
                { label: "Scalability notes", href: "https://www.linkedin.com/posts/dama5323_aws-solutionarchitecture-opentowork-activity-7393617432126464000-9rHm", icon: "external" }
            ]
        }
    };

    var ICONS = {
        github: '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>',
        external: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M6 3H3.5A1.5 1.5 0 0 0 2 4.5v8A1.5 1.5 0 0 0 3.5 14h8A1.5 1.5 0 0 0 13 12.5V10"/><path d="M9 2h5v5M14 2 7.5 8.5"/></svg>',
        arrow: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>',
        close: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m4 4 8 8M12 4l-8 8"/></svg>'
    };

    function el(tag, className, text) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (text) node.textContent = text;
        return node;
    }

    function section(number, title, build) {
        var wrap = el("section", "proj-case-section");
        var heading = el("h4");
        heading.innerHTML = '<span aria-hidden="true">' + number + " / </span>" + title;

        wrap.appendChild(heading);

        if (typeof build === "string") {
            wrap.appendChild(el("p", "", build));
        } else if (Array.isArray(build)) {
            var list = el("ul", "proj-case-list");
            build.forEach(function (item) {
                list.appendChild(el("li", "", item));
            });
            wrap.appendChild(list);
        } else if (build) {
            wrap.appendChild(build);
        }

        return wrap;
    }

    function buildCase(project) {
        var fragment = document.createDocumentFragment();

        var media = el("div", "proj-case-media");
        media.setAttribute("data-kind", project.imageKind);
        var image = el("img");
        image.src = project.image;
        image.alt = project.imageAlt;
        image.loading = "lazy";
        image.decoding = "async";
        media.appendChild(image);
        fragment.appendChild(media);

        var body = el("div", "proj-case-body");

        body.appendChild(el("p", "proj-case-kicker mono", project.index + " / " + project.category));
        var title = el("h3", "proj-case-title", project.title);
        title.id = "project-dialog-title";
        body.appendChild(title);
        body.appendChild(el("p", "proj-case-status mono", project.status));
        body.appendChild(el("p", "proj-case-lede", project.lede));

        var grid = el("div", "proj-case-grid");

        grid.appendChild(section("01", "Project overview", project.overview));
        grid.appendChild(section("02", "Problem addressed", project.problem));
        grid.appendChild(section("03", "My role and contribution", project.role));
        grid.appendChild(section("04", "Technical architecture", project.architecture));
        grid.appendChild(section("05", "Implementation approach", project.implementation));

        var challenges = el("section", "proj-case-section");
        var challengesHeading = el("h4");
        challengesHeading.innerHTML = '<span aria-hidden="true">06 / </span>Technical challenges';
        challenges.appendChild(challengesHeading);
        var challengeList = el("div", "proj-case-challenges");
        project.challenges.forEach(function (challenge) {
            var item = el("div", "proj-case-challenge");
            item.appendChild(el("h5", "", challenge.title));
            item.appendChild(el("p", "", challenge.text));
            challengeList.appendChild(item);
        });
        challenges.appendChild(challengeList);
        grid.appendChild(challenges);

        var tech = el("section", "proj-case-section");
        var techHeading = el("h4");
        techHeading.innerHTML = '<span aria-hidden="true">07 / </span>Technologies and tools';
        tech.appendChild(techHeading);
        var techList = el("ul", "proj-case-tech");
        project.tech.forEach(function (name) {
            techList.appendChild(el("li", "", name));
        });
        tech.appendChild(techList);
        grid.appendChild(tech);

        grid.appendChild(section("08", "Outcome and verified results", project.outcome));

        var links = el("section", "proj-case-section proj-case-wide");
        var linksHeading = el("h4");
        linksHeading.innerHTML = '<span aria-hidden="true">09 / </span>Links and documentation';
        links.appendChild(linksHeading);

        var linkRow = el("div", "proj-case-links");
        project.links.forEach(function (link) {
            var anchor = el("a", "proj-case-link");
            anchor.href = link.href;
            anchor.target = "_blank";
            anchor.rel = "noopener noreferrer";
            anchor.innerHTML = ICONS[link.icon] || ICONS.external;
            anchor.appendChild(document.createTextNode(link.label));
            linkRow.appendChild(anchor);
        });
        links.appendChild(linkRow);

        if (project.links.some(function (link) { return link.note; })) {
            var notes = project.links
                .filter(function (link) { return link.note; })
                .map(function (link) { return link.label + ": " + link.note; })
                .join(" ");
            links.appendChild(el("p", "proj-case-note", notes));
        }

        grid.appendChild(links);
        body.appendChild(grid);
        fragment.appendChild(body);

        return fragment;
    }

    function initFilters() {
        var buttons = Array.prototype.slice.call(document.querySelectorAll("[data-project-filter]"));
        var cards = Array.prototype.slice.call(document.querySelectorAll("[data-project-card]"));
        var count = document.getElementById("project-count");

        if (!buttons.length || !cards.length) return;

        function apply(filter) {
            var shown = 0;

            cards.forEach(function (card) {
                var categories = (card.getAttribute("data-categories") || "").split(/\s+/);
                var match = filter === "all" || categories.indexOf(filter) !== -1;
                card.hidden = !match;
                if (match) shown += 1;
            });

            buttons.forEach(function (button) {
                button.setAttribute("aria-pressed", String(button.getAttribute("data-project-filter") === filter));
            });

            if (count) {
                count.textContent = shown + (shown === 1 ? " project" : " projects");
            }
        }

        buttons.forEach(function (button) {
            button.addEventListener("click", function () {
                apply(button.getAttribute("data-project-filter"));
            });
        });

        if (location.hash.indexOf("#project-") === 0) {
            var initial = location.hash.replace("#project-", "");
            var initialCard = document.querySelector('[data-project-card][data-project="' + initial + '"]');
            if (initialCard && initialCard.hidden) apply("all");
        }
    }

    function initDialog() {
        var dialog = document.getElementById("project-dialog");
        if (!dialog) return;

        var content = document.getElementById("project-dialog-content");
        var closeButton = dialog.querySelector("[data-project-close]");
        var opener = null;

        function close() {
            if (typeof dialog.close === "function") dialog.close();
            else dialog.removeAttribute("open");
        }

        function open(id) {
            var project = DATA[id];
            if (!project) return;

            content.textContent = "";
            content.appendChild(buildCase(project));

            if (typeof dialog.showModal === "function") {
                if (!dialog.open) dialog.showModal();
            } else {
                dialog.setAttribute("open", "");
            }

            var panel = dialog.querySelector(".proj-case");
            if (panel) panel.scrollTop = 0;
            if (closeButton) closeButton.focus();
        }

        document.querySelectorAll("[data-project-open]").forEach(function (button) {
            button.addEventListener("click", function () {
                opener = button;
                open(button.getAttribute("data-project-open"));
            });
        });

        if (closeButton) closeButton.addEventListener("click", close);

        dialog.addEventListener("click", function (event) {
            if (event.target === dialog) close();
        });

        dialog.addEventListener("close", function () {
            if (opener) opener.focus();
            opener = null;
        });
    }

    try {
        initFilters();
        initDialog();
    } catch (error) {
        if (window.console && console.warn) {
            console.warn("Project section could not initialise interactions.", error);
        }
    }
})();
