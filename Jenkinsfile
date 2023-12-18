
def jekyll_env = {
    switch(env.BRANCH_NAME) {
        case 'main': 
            return 'production'
        case 'deploy': 
            return 'deployment'
        default: 
            return 'development'
    }
}

pipeline {
    agent {
        dockerfile {
            label 'pi'
            args '-v /tmp:/tmp -u root:root'
        }
    }
    environment {
        JEKYLL_ENV=jekyll_env()
    }
    stages{
        stage('Build') {
            when {
                expression {
                    JEKYLL_ENV != 'deployment'
                }
            }
            steps{
                echo '>>>> Installing gems <<<<'
                sh 'bundle install'
                echo '>>>> Build site <<<<'
                sh 'bundle exec jekyll build'
            }
        }
        stage('DeployToDev') {
            when {
                expression {
                     JEKYLL_ENV == 'development' 
                }
            }
            environment {
                SSH_CREDS = credentials('jenkins-ssh-applepi')
            }
            steps {
                echo '>>>> Copying site to staging server <<<<'
                sh 'ssh -i $SSH_CREDS -o StrictHostKeyChecking=no chengrui@applepi "rm -r /home/chengrui/_site"'
                sh 'scp -r -i $SSH_CREDS -o StrictHostKeyChecking=no _site/ $SSH_CREDS_USR@applepi:/home/chengrui/_site'
            }
        }
        stage('DeployToProd') {
            environment {
                GITHUB_CREDS = credentials('jenkins-github-sync')
            }
            when {
                expression {
                    JEKYLL_ENV == 'production'
                }
            }
            steps {
                echo '>>>> Invoking deploy_site_prod job to upload the artificat to orphan branch <<<<'
                build(job: 'deploy_site_prod', parameters: [
                    string(name:'path_to_site', value: "${env.WORKSPACE}" + "/_site/"),
                    string(name:'git_usr', value: "${GITHUB_CREDS_USR}"),
                    string(name:'git_cred', value: "${GITHUB_CREDS}"),
                    ])
            }
        }
    }
}