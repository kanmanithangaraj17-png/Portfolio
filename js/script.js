document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------
    // -----------------------------------------
    // 1. Data Structures (Experience & Education)
    // -----------------------------------------
    const experience = [
        {
            year: "2025 - Present",
            role: "Assistant News Editor",
            organization: "Doordarshan Kendra Chennai",
            description: "In this role, I handle the entire news bulletin workflow, including editorial planning, script editing and English–Tamil translation. I also contribute to the organisation's digital and social media content, ensuring timely and engaging news delivery across platforms. My work extends beyond state-level coverage, with a strong focus on Central Government policies and initiatives, national affairs, international news, sports, and other major news beats. I also produce news packages and special reports, enabling me to combine editorial judgment, storytelling, translation, and broadcast production. This role has strengthened my ability to work in a dynamic national newsroom while maintaining the highest standards of accuracy, impartiality, and public service journalism."
        },
        {
            year: "2025",
            role: "Senior Sub Editor & Tamil Content Writer",
            organization: "Vasanth News",
            description: "Joined Vasanth News as a Senior Sub Editor and Tamil Content Writer, gaining well-rounded experience across television and digital media. Responsible for news bulletin handling, editorial coordination, and creating engaging content for social media. Balancing broadcast journalism with digital content production strengthened adaptability and multitasking. Contributed as a voice-over artist, expanding expertise in news presentation and broadcast communication."
        },
        {
            year: "2025",
            role: "News Sub Editor",
            organization: "News 7 Tamil",
            description: "Joining News 7 Tamil gave me a completely different perspective on journalism through the fast-paced world of 24×7 television news. The newsroom environment strengthened my ability to work under pressure, deliver breaking news with speed and accuracy, and meet strict editorial deadlines. Gained valuable experience in news reporting, editorial operations, script editing, and live news production, enhancing decision-making, newsroom coordination, and understanding of broadcast journalism."
        },
        {
            year: "2024",
            role: "Freelance Tamil Content Writer",
            organization: "Kalki Group, Chennai",
            description: "Produced a wide range of content across multiple genres, including human-interest stories, cinema features, news articles, and in-depth feature stories for a six-month assignment. The opportunity allowed me to adapt writing to different audiences and editorial styles, significantly enhancing creativity, versatility, and storytelling skills. Strengthened ability to produce engaging, high-quality content within tight deadlines."
        },
        {
            year: "2023–2024",
            role: "Journalist & Tamil Content Writer",
            organization: "Dinathanthi",
            description: "Gained invaluable newsroom and field reporting experience. Published numerous feature articles, travelled extensively across Tamil Nadu, and interacted with people from diverse communities. Reporting on a wide range of beats—including politics, environment, health, and investigative stories—broadened perspective and enhanced ability to tell impactful stories with accuracy, depth, and responsibility."
        },
        {
            year: "2023",
            role: "Intern & Tamil Content Writer",
            organization: "Theekkathir Newspaper, Madurai",
            description: "Completed a one-month internship gaining hands-on experience in news reporting, with a strong focus on rural reporting and community-based journalism. Worked as a Tamil Content Writer, researching and publishing feature articles on social issues and stories that deserved public attention. This experience strengthened reporting, interviewing, and storytelling skills while reinforcing commitment to journalism that gives a voice to underrepresented communities."
        }
    ];

    const education = [
        {
            year: "2023 - 2025",
            degree: "MA - Journalism",
            institution: "Madras University",
            major: "Journalism"
        },
        {
            year: "2020 - 2023",
            degree: "BA - Journalism & Mass Communication",
            institution: "Fatima College, Madurai",
            major: "Journalism & Mass Communication"
        }
    ];

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // -----------------------------------------
    // 2. Dynamic Rendering (Experience & Education)
    // -----------------------------------------

    // Render Experience
    const experienceContainer = document.getElementById('experience-timeline');
    if (experienceContainer) {
        experience.forEach((item, index) => {
            const delayClass = index > 0 ? `delay-${index}` : '';
            const expHTML = `
                <div class="timeline-item fade-in-up ${delayClass}">
                    <div class="timeline-dot"></div>
                    <div class="timeline-year">${item.year}</div>
                    <div class="timeline-content">
                        <h3 class="timeline-role">${item.role}</h3>
                        <div class="timeline-org">${item.organization}</div>
                        <p class="mb-0 text-light-gray">${item.description}</p>
                    </div>
                </div>
            `;
            experienceContainer.insertAdjacentHTML('beforeend', expHTML);
        });
    }

    // Render Education
    const educationContainer = document.getElementById('education-container');
    if (educationContainer) {
        education.forEach((item, index) => {
            const delayClass = index > 0 ? `delay-${index}` : '';
            const eduHTML = `
                <div class="col-md-6 fade-in-up ${delayClass}">
                    <div class="edu-card">
                        <div class="edu-year">${item.year}</div>
                        <h3 class="edu-degree">${item.degree}</h3>
                        <div class="edu-inst fw-bold">${item.institution}</div>
                        <div class="edu-major">${item.major}</div>
                    </div>
                </div>
            `;
            educationContainer.insertAdjacentHTML('beforeend', eduHTML);
        });
    }
    // -----------------------------------------
    const searchInput = document.getElementById('article-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const noResultsMsg = document.getElementById('no-results');
    let currentCategory = 'All';
    let searchQuery = '';

    function filterArticles() {
        const articleWrappers = document.querySelectorAll('.article-card-wrapper');
        let visibleCount = 0;
        
        articleWrappers.forEach(wrapper => {
            const category = wrapper.getAttribute('data-category') || '';
            const titleElement = wrapper.querySelector('.article-title');
            const descElement = wrapper.querySelector('.article-desc');
            const pubElement = wrapper.querySelector('.article-publication');
            
            const title = titleElement ? titleElement.textContent.toLowerCase() : '';
            const desc = descElement ? descElement.textContent.toLowerCase() : '';
            const pub = pubElement ? pubElement.textContent.toLowerCase() : '';
            
            const matchCategory = currentCategory === 'All' || category === currentCategory;
            const searchLower = searchQuery.toLowerCase();
            const matchSearch = title.includes(searchLower) || 
                                desc.includes(searchLower) || 
                                category.toLowerCase().includes(searchLower) || 
                                pub.includes(searchLower);
                                
            if (matchCategory && matchSearch) {
                wrapper.classList.remove('d-none');
                visibleCount++;
            } else {
                wrapper.classList.add('d-none');
            }
        });
        
        if (noResultsMsg) {
            if (visibleCount === 0) {
                noResultsMsg.classList.remove('d-none');
            } else {
                noResultsMsg.classList.add('d-none');
            }
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            filterArticles();
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            currentCategory = e.target.getAttribute('data-filter');
            filterArticles();
        });
    });

    // -----------------------------------------
    // 4. Contact Form Mailto Handler
    // -----------------------------------------
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Target email address
        const toEmail = 'kanmanithangaraj17@gmail.com';
        
        // Construct mailto URL
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message.replace(/\n/g, '%0D%0A')}`;
        const mailtoLink = `mailto:${toEmail}?subject=${encodeURIComponent(subject)}&body=${body}`;
        
        // Open default email client
        window.location.href = mailtoLink;
        
        // Reset form
        contactForm.reset();
    });

    // -----------------------------------------
    // 5. Navbar scroll effect
    // -----------------------------------------
    const navbar = document.querySelector('.custom-navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
        } else {
            navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Close mobile menu on link click
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.getElementById('navbarNav');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                let bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (!bsCollapse) {
                    bsCollapse = new bootstrap.Collapse(navbarCollapse);
                }
                bsCollapse.hide();
            }
        });
    });

    // -----------------------------------------
    // 6. Three.js Background Animation (Investigative Theme)
    // -----------------------------------------
    function initThreeJS() {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        
        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 20;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Group to hold all particles and lines
        const group = new THREE.Group();
        scene.add(group);

        // "Connecting the dots" theme for a journalist (like an investigation board)
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 80 : 150;
        
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
            
            velocities.push({
                x: (Math.random() - 0.5) * 0.02,
                y: (Math.random() - 0.5) * 0.02,
                z: (Math.random() - 0.5) * 0.02
            });
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Particle Material
        const particleMaterial = new THREE.PointsMaterial({
            color: 0xe63946, // Red accent
            size: 0.15,
            transparent: true,
            opacity: 0.8
        });

        const particles = new THREE.Points(geometry, particleMaterial);
        group.add(particles);

        // Line Material
        const lineMaterial = new THREE.LineBasicMaterial({
            color: 0xe63946,
            transparent: true,
            opacity: 0.15
        });

        // Mouse interaction
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX - windowHalfX) * 0.001;
            mouseY = (event.clientY - windowHalfY) * 0.001;
        });

        // Lines mesh (will be updated every frame)
        const linesGeometry = new THREE.BufferGeometry();
        const linesMesh = new THREE.LineSegments(linesGeometry, lineMaterial);
        group.add(linesMesh);

        // Animation Loop
        function animate() {
            requestAnimationFrame(animate);

            // Update particle positions
            const positionsAttribute = geometry.getAttribute('position');
            for (let i = 0; i < particleCount; i++) {
                let x = positionsAttribute.getX(i) + velocities[i].x;
                let y = positionsAttribute.getY(i) + velocities[i].y;
                let z = positionsAttribute.getZ(i) + velocities[i].z;

                // Bounce off boundaries
                if (Math.abs(x) > 20) velocities[i].x *= -1;
                if (Math.abs(y) > 20) velocities[i].y *= -1;
                if (Math.abs(z) > 10) velocities[i].z *= -1;

                positionsAttribute.setXYZ(i, x, y, z);
            }
            positionsAttribute.needsUpdate = true;

            // Connect nearby dots
            const linePositions = [];
            for (let i = 0; i < particleCount; i++) {
                for (let j = i + 1; j < particleCount; j++) {
                    const dx = positionsAttribute.getX(i) - positionsAttribute.getX(j);
                    const dy = positionsAttribute.getY(i) - positionsAttribute.getY(j);
                    const dz = positionsAttribute.getZ(i) - positionsAttribute.getZ(j);
                    const distSq = dx*dx + dy*dy + dz*dz;

                    // Draw line if points are close
                    if (distSq < 15) {
                        linePositions.push(
                            positionsAttribute.getX(i), positionsAttribute.getY(i), positionsAttribute.getZ(i),
                            positionsAttribute.getX(j), positionsAttribute.getY(j), positionsAttribute.getZ(j)
                        );
                    }
                }
            }
            linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

            // Smooth mouse follow for the entire group
            targetX = mouseX * 0.5;
            targetY = mouseY * 0.5;
            group.rotation.y += 0.05 * (targetX - group.rotation.y);
            group.rotation.x += 0.05 * (targetY - group.rotation.x);

            // Slow continuous rotation
            group.rotation.y += 0.0005;

            renderer.render(scene, camera);
        }

        animate();

        // Handle Resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // Initialize Three.js
    initThreeJS();
});
