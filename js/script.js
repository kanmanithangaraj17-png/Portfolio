document.addEventListener('DOMContentLoaded', () => {
    // -----------------------------------------
    // -----------------------------------------
    // 1. Data Structures (Experience & Education)
    // -----------------------------------------
    const experience = [
        {
            year: "2024 - Present",
            role: "Senior Investigative Journalist",
            organization: "The Daily Chronicle",
            description: "Leading a team of reporters to uncover systemic corruption in local government. Recipient of the National Journalism Award for Investigative Reporting."
        },
        {
            year: "2021 - 2024",
            role: "Political Correspondent",
            organization: "National Review",
            description: "Covered the White House and Capitol Hill, breaking several major stories regarding legislative policy shifts and election campaigns."
        },
        {
            year: "2018 - 2021",
            role: "Staff Writer",
            organization: "Global Times",
            description: "Wrote feature articles focusing on social justice, immigration, and community issues. Consistently ranked among the top 5 most-read writers."
        },
        {
            year: "2016 - 2018",
            role: "Journalism Intern / Junior Reporter",
            organization: "Metro News",
            description: "Started as an intern and quickly promoted to Junior Reporter. Covered local city council meetings, crime beats, and community events."
        }
    ];

    const education = [
        {
            year: "2014 - 2016",
            degree: "Master of Science in Journalism",
            institution: "Columbia University Graduate School of Journalism",
            major: "Investigative Reporting Focus"
        },
        {
            year: "2010 - 2014",
            degree: "Bachelor of Arts in Political Science",
            institution: "University of California, Berkeley",
            major: "Minor in English Literature"
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
        const toEmail = 'name@example.com';
        
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
